import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private  navCtrl: NavController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

   // Método para incia sesión
   onLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      console.log('Login: ', email, password);
      // Aquí se llamará al AuthService para manejar la autenticación
      // Redireccionara a la pagina home o where ever ...
    }
   }

   // Navegar a la pagina de registro
   goToRegister(){
    this.navCtrl.navigateForward('/register');
   }

   // Navegar a la pagina de recuperación de contraseña
   goToRecoverPassword(){
    this.navCtrl.navigateForward('/recover-password');
   }

  ngOnInit() {
  }

}