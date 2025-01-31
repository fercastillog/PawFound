import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.changePasswordForm = this.fb.group({
      actualPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  /** 🔹 Valida si las contraseñas nuevas coinciden */
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { notMatching: true };
  }

  async onChangePassword() {
    if (this.changePasswordForm.invalid) return;

    const { actualPassword, newPassword } = this.changePasswordForm.value;
    
    const loading = await this.loadingCtrl.create({
      message: 'Cambiando contraseña...',
    });
    await loading.present();

    const response = await this.authService.changePassword(actualPassword, newPassword);
    await loading.dismiss();

    this.showAlert(response.success ? 'Éxito' : 'Error', response.message);

    // volver a login
      if (response.success) this.authService.logout();
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
