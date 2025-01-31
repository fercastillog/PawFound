import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false; // Estado de autenticación

  constructor(private auth: Auth) {}

  ngOnInit() {
    // ✅ Verifica si hay un usuario logueado
    user(this.auth).subscribe(currentUser => {
      this.isLoggedIn = !!currentUser; // true si está logueado, false si no
      console.log("🔹 Estado de sesión:", this.isLoggedIn);
    });
  }
}
