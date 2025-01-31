import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder, 
    private navCtrl: NavController,
    private authService: AuthService, 
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password)
        .then(async (userCredential) => {
          console.log('✅ Inicio de sesión exitoso', userCredential);
          
          // 🔹 Obtener datos del usuario desde Firestore
          this.authService.getUserProfile().subscribe(userData => {
            console.log('📂 Datos del usuario:', userData);
          });

          // ✅ Redirigir al perfil después del login
          this.router.navigate(['/profile']);
        })
        .catch((error) => {
          this.errorMessage = 'Error al iniciar sesión: ' + error.message; 
          console.error('❌ Error durante el inicio de sesión:', error);
        });
    } else {
      console.log('❌ Formulario inválido');
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToRecoverPassword() {
    this.navCtrl.navigateForward('/recover-password');
  }
}
