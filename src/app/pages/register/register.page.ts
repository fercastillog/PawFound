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
      name:['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      phone: ['', Validators.required, Validators.pattern('[0-9]{9}')],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required, Validators.pattern('[0-9]{5}')],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
   }

   // Método para Registrar usuario
   onRegister(){
    if(this.registerForm.valid){
      const { name,phone,email, password } = this.registerForm.value;
      console.log('Register: ',name,phone, email, password);
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