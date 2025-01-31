import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { authState } from 'rxfire/auth';
import { fetchSignInMethodsForEmail, updatePassword } from 'firebase/auth';

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
        email,
        imageUrl: '' // Se inicializa sin imagen
      });

      return { success: true };
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      throw error;
    }
  }

/** 🔹 RECUPERAR CONTRASEÑA */
async recoverPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Verifica si el email está registrado en Firebase
    const methods = await fetchSignInMethodsForEmail(this.auth, email);
    
    if (methods.length === 0) {
      return { success: false, message: 'El correo no está registrado.' };
    }

    // Envía el correo de recuperación
    await sendPasswordResetEmail(this.auth, email);
    return { success: true, message: 'Se ha enviado un enlace de recuperación a tu correo.' };
  } catch (error) {
    console.error('❌ Error en recuperación de contraseña:', error);
    return { success: false, message: 'Hubo un problema, intenta de nuevo.' };
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

  updateUserProfile(data: any) {
    this.user$.subscribe(user => {
      if (user?.uid) {
        const userRef = doc(this.firestore, `users/${user.uid}`);
        updateDoc(userRef, data).catch(error => console.error('❌ Error al actualizar perfil:', error));
      }
    });
  }

    /** 🔹 CAMBIAR CONTRASEÑA */
    async changePassword(actualPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
      try {
        const user = this.auth.currentUser;
        if (!user || !user.email) {
          return { success: false, message: 'No hay usuario autenticado.' };
        }
  
        // Re-autenticamos al usuario antes de cambiar la contraseña
        await signInWithEmailAndPassword(this.auth, user.email, actualPassword);
  
        // Actualizamos la contraseña en Firebase Authentication
        await updatePassword(user, newPassword);
        
        return { success: true, message: 'Contraseña actualizada correctamente.' };
      } catch (error: any) {
        console.error('❌ Error al cambiar la contraseña:', error);
        let errorMsg = 'No se pudo cambiar la contraseña.';
  
        if (error.code === 'auth/wrong-password') {
          errorMsg = 'La contraseña actual es incorrecta.';
        } else if (error.code === 'auth/weak-password') {
          errorMsg = 'La nueva contraseña es demasiado débil.';
        }
  
        return { success: false, message: errorMsg };
      }
    }
}
