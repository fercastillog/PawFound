import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Importar el servicio de autenticación
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; // Para mostrar el mensaje de error

  constructor(
    private fb: FormBuilder, 
    private navCtrl: NavController,
    private authService: AuthService, // Inyección del servicio de autenticación
    private router: Router // Inyección del enrutador para redirigir
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método para iniciar sesión
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Llamada al servicio de autenticación
      this.authService.login(email, password)
        .then((userCredential) => {
          console.log('Inicio de sesión exitoso', userCredential);
          this.router.navigate(['/paw-found']); // Redirigir al usuario a la página principal
        })
        .catch((error) => {
          this.errorMessage = 'Error al iniciar sesión: ' + error.message; // Mostrar mensaje de error
          console.error('Error durante el inicio de sesión:', error);
        });
    }
  }

  // Navegar a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // Navegar a la página de recuperación de contraseña
  goToRecoverPassword() {
    this.navCtrl.navigateForward('/recover-password');
  }

  ngOnInit() {}
}
