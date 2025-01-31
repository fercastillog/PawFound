import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { authState } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  user$: Observable<User | null> = authState(this.auth);

  constructor() {
    console.log('✅ AuthService inicializado correctamente');
  }

  /** 🔹 LOGIN - Iniciar sesión */
  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    }
  }

  /** 🔹 REGISTRO DE USUARIO */
  async register(name: string, email: string, password: string, phone: string): Promise<{ success: boolean }> {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      if (!cred.user?.uid) throw new Error('Error al obtener UID del usuario');

      const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        name,
        phone,
        email
      });

      return { success: true };
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      throw error;
    }
  }

  /** 🔹 RECUPERAR CONTRASEÑA */
  async recoverPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('❌ Error en recuperación de contraseña:', error);
      throw error;
    }
  }

  /** 🔹 CERRAR SESIÓN */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      throw error;
    }
  }

  /** 🔹 OBTENER PERFIL DEL USUARIO (DATOS DESDE FIRESTORE) */
  getUserProfile(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => user?.uid ? docData(doc(this.firestore, `users/${user.uid}`)) : of(null))
    );
  }
}
