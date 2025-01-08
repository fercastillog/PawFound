import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private  navCtrl: NavController) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    });
   }

   // Método para incia sesión
   onRegister(){
    if(this.registerForm.valid){
      const { email, password, confirmPassword } = this.registerForm.value;
      console.log('Register: ', email, password,confirmPassword);
      // Aquí se llamará al AuthService para manejar la autenticación
      // Redireccionara a la pagina home o where ever ...
    }
   }

   // Navegar a la pagina de registro
   goToLogin(){
    this.navCtrl.navigateForward('/login');
   }

  ngOnInit() {
  }

}