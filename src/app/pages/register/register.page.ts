import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  successMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private ngZone: NgZone // 👈 Importamos NgZone para manejar la navegación
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.valid) {
      const { name, phone, email, password } = this.registerForm.value;
      const user = { name, phone, email, password };

      this.authService
        .register(user)
        .then((response) => {
          if (response.success) {
            this.successMessage = true;
            console.log('✅ Registro exitoso! Redirigiendo a login...');

            setTimeout(() => {
              this.ngZone.run(() => {  
                this.router.navigate(['/login'], { replaceUrl: true });
              });
            }, 2000);
          }
        })
        .catch((error) => {
          console.error('❌ Error durante el registro:', error);
          this.showErrorToast(error.message);
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  async showErrorToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 3000;
    toast.color = 'danger';
    document.body.appendChild(toast);
    await toast.present();
  }
}
