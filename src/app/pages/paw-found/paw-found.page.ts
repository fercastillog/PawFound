import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-paw-found',
  templateUrl: './paw-found.page.html',
  styleUrls: ['./paw-found.page.scss'],
  standalone: false,
})
export class PawFoundPage implements OnInit {
  reports$: Observable<any[]>;
  isLoggedIn: boolean = false;
  isExpanded: { [key: string]: boolean } = {}; // Controla qué tarjeta se expande

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private navCtrl: NavController
  ) {
    // ✅ Obtener los reportes desde Firestore
    const reportsCollection = collection(this.firestore, 'reports');
    this.reports$ = collectionData(reportsCollection, { idField: 'id' });
  }

  ngOnInit() {
    // ✅ Detectar si el usuario está autenticado
    user(this.auth).subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      console.log("🔹 Usuario autenticado:", this.isLoggedIn);
    });
  }

  /** 🔹 Manejar "Ver más" */
  toggleDetails(reportId: string) {
    if (!this.isLoggedIn) {
      this.navCtrl.navigateForward('/login'); // Si no está logueado, ir a login
    } else {
      this.isExpanded[reportId] = !this.isExpanded[reportId]; // Si está logueado, mostrar detalles
    }
  }

  openWhatsApp(phone: string) {
    const message = encodeURIComponent("¡Hola! Estoy interesado en la publicación de tu mascota.");
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
