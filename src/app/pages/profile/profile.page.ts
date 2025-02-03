import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user = { name: '', email: '' };
  userImage: string | undefined;
  auth = getAuth();
  firestore = inject(Firestore);

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Esperar a que el usuario se autentique antes de cargar datos
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loadUserProfile(user.uid);
      } else {
        this.showToast('Debes iniciar sesión para ver tu perfil', 'warning');
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  /** 🔹 Cargar perfil del usuario desde Firestore */
  async loadUserProfile(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        this.user.name = userData?.['name'] || 'Usuario';
        this.user.email = userData?.['email'] || 'Sin correo';
        this.userImage = userData?.['imageUrl'] || undefined;
      } else {
        // Si no existe, crear usuario en Firestore
        await setDoc(userRef, { name: this.auth.currentUser?.displayName, email: this.auth.currentUser?.email });
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      this.showToast('Error al cargar perfil', 'danger');
    }
  }

  /** 📸 Cambiar foto de perfil (Guardada en Firestore como Base64) */
  async changeProfilePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64, // Obtener en Base64
        source: CameraSource.Prompt, // Pregunta si usar Cámara o Galería
      });

      if (!image.base64String) {
        throw new Error('No se obtuvo la imagen.');
      }

      const userId = this.auth.currentUser?.uid;
      if (!userId) return;

      const base64Image = `data:image/jpeg;base64,${image.base64String}`;

      // Guardar en Firestore
      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, { imageUrl: base64Image });

      // Actualizar la UI con la nueva imagen
      this.userImage = base64Image;
      this.showToast('✅ Foto de perfil actualizada', 'success');
    } catch (error) {
      console.error('❌ Error al cambiar la foto:', error);
      this.showToast('Error al cambiar la foto', 'danger');
    }
  }

  /** 🔔 Mostrar mensaje de Toast */
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  /** 🔓 Cerrar sesión */
  logout() {
    this.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch(err => console.error('Error al cerrar sesión', err));
  }
}
