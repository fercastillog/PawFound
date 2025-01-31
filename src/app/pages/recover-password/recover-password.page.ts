import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: false,
})
export class RecoverPasswordPage implements OnInit {
  recoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async recoverPassword() {
    const email = this.recoveryForm.value.email;
    if (!email) return;

    const loading = await this.loadingCtrl.create({
      message: 'Verificando correo...',
    });
    await loading.present();

    try {
      const response = await this.authService.recoverPassword(email);
      await loading.dismiss();
      this.showAlert(response.success ? 'Éxito' : 'Error', response.message);
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Error', 'Hubo un problema, intenta de nuevo.');
      console.error('❌ Error en recuperación de contraseña:', error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
