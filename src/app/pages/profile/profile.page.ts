import { Component, OnInit } from '@angular/core';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  user = {
    name: '',
    lastName: '',
  };
  userImage: string | undefined;
  
  constructor(private navCtrl: NavController) { 

  }


  async changeProfilePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
      });
  
      this.userImage = `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Error al cambiar la foto de perfil:', error);
    }
  }

  logout() {
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/login'); // Redirecciónar a la página de inicio de sesión
     
  }
  ngOnInit() {
  }

}