import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})


export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  passwordMatchValidator: any;

  

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      actualPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
   }

   
  ngOnInit() {
  }

  onChange() {
    if(this.changePasswordForm.valid){
      const {actualPassword, newPassword, confirmNewPassword} = this.changePasswordForm.value;
      console.log('Change password: ', actualPassword, newPassword, confirmNewPassword);
    alert('Contraseña cambiada exitosamente!');
  }

}
}
