import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cambioPassword() {
    // Implementación de la lógica para cambiar la contraseña
    alert('Contraseña cambiada exitosamente!');
  }

}
