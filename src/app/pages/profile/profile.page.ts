import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user = {
    name: '',
    email: '',
  };
  userImage: string | undefined;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private storage: AngularFireStorage // Firebase Storage
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  /** 🔹 Cargar perfil del usuario */
  loadUserProfile() {
    this.authService.getUserProfile().subscribe((userData: any) => {
      if (userData) {
        this.user.name = userData.name || 'Usuario';
        this.user.email = userData.email || 'Sin correo';
        this.userImage = userData.imageUrl || undefined;
      }
    });
  }

  /** 🔹 Capturar imagen y subirla */
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

      const blob = this.base64ToBlob(image.base64String, 'image/jpeg');
      const filePath = `profile_pics/${new Date().getTime()}_profile.jpg`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, blob);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            if (url) {
              this.userImage = url;
              await this.authService.updateUserProfile({ imageUrl: url });
            }
          });
        })
      ).subscribe();

    } catch (error) {
      console.log('Error al tomar la foto:', error);
    }
  }

  /** 🔹 Convertir Base64 a Blob */
  base64ToBlob(base64: string, contentType: string) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }

  /** 🔹 Cerrar sesión */
  logout() {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch(err => console.error('Error al cerrar sesión', err));
  }
}
