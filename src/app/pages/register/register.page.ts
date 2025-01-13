import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  successMessage: boolean = false;
  constructor(private fb: FormBuilder, private  navCtrl: NavController,private router: Router) {
    this.registerForm = this.fb.group({
      name:['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      phone: ['', Validators.required, Validators.pattern('[0-9]{9}')],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required, Validators.pattern('[0-9]{5}')],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-zA-Z0-9!@#$%^&*()_+\\-=[\\]{};:"|,.<>/?]{6,}'),
        ],
      ],
    });
    
   }

   // Método para Registrar usuario
   onRegister(){
    if(this.registerForm.valid){
      const { name,phone,email, password } = this.registerForm.value;
      console.log('Register: ',name,phone, email, password);
      // Aquí se llamará al AuthService para manejar la autenticación
      // Redireccionara a la pagina home o where ever ...
      if (this.registerForm.valid) {
        this.successMessage = true; // Muestra el mensaje
        setTimeout(() => {
          this.successMessage = false; // Oculta el mensaje después de 3 segundos
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
        }, 3000);
      }}
   }

  ngOnInit() {
  }

}