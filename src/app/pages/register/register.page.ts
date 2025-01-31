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
    private ngZone: NgZone
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],  
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],  
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, phone, email, password } = this.registerForm.value;

      try {
        const response = await this.authService.register(name, email, password, phone);
        if (response.success) {
          this.successMessage = true;
          console.log('✅ Registro exitoso! Redirigiendo a login...');
          
          // ✅ Asegurar redirección usando NgZone
          this.ngZone.run(() => {
            this.router.navigate(['/login'], { replaceUrl: true });
          });
        }
      } catch (error: any) {
        console.error('❌ Error durante el registro:', error);
        this.showErrorToast(error.message);
      }
    } else {
      console.log('❌ Formulario inválido');
      this.showErrorToast('Por favor, completa correctamente el formulario.');
    }
  }

  /** 🔹 Mostrar mensaje de error */
  async showErrorToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 3000;
    toast.color = 'danger';
    document.body.appendChild(toast);
    await toast.present();
  }
}
