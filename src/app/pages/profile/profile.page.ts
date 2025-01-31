import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
    this.authService.getUserProfile().subscribe(userData => {
      if (userData) {
        this.user.name = userData.name || 'Usuario';
        this.user.email = userData.email || 'Sin correo';
        this.userImage = userData.imageUrl || undefined;
      }
    });
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe((userData: any) => {
      if (userData) {
        this.user.name = userData.name || 'Usuario';
        this.user.email = userData.email || 'Sin correo';
        this.userImage = userData.imageUrl || undefined;
      }
    });
  }

  async changeProfilePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64, // Para obtener la imagen en Base64
        source: CameraSource.Prompt, // Muestra opciones: "Cámara" o "Galería"
      });

      this.userImage = `data:image/jpeg;base64,${image.base64String}`;

      // Aquí podrías subir la imagen a un servidor o almacenamiento en la nube
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch(err => console.error('Error al cerrar sesión', err));
  }
}
