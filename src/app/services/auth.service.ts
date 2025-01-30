import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth, 
    private firestore: AngularFirestore
  ) {
    console.log('AuthService inicializado correctamente');
  }
  // Login
  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar un usuario
  register(user: User): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => {
        console.log('Usuario creado:', cred);

        if (!cred.user?.uid) {
          throw new Error('Error al obtener UID del usuario');
        }

        // Guardamos el usuario en Firestore
        return this.firestore.collection('users').doc(cred.user.uid).set({
          name: user.name,
          phone: user.phone,  // Ahora guarda el teléfono también
          email: user.email,
          uid: cred.user.uid 
        });
      })
      .then(() => {
        console.log('Usuario guardado en Firestore correctamente');
        return { success: true };
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        throw error; // Relanzamos el error para capturarlo en el componente
      });
  }

  // Recuperar contraseña
  recoverPassword(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }

  // Logout
  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Obtener el UID del usuario actual
  getUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve('');
        }
      });
    });
  }
}
