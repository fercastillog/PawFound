import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, query, where, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
  standalone: false,
})
export class MyReportsPage implements OnInit {
  reports: any[] = [];
  firestore = inject(Firestore);
  auth = getAuth(); // Autenticación del usuario

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    // Esperar a que el usuario se autentique antes de cargar los reportes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loadUserReports(user.uid);
      } else {
        this.showToast('Debes iniciar sesión para ver tus reportes', 'warning');
      }
    });
  }

  /** 🔹 Cargar los reportes del usuario autenticado */
  async loadUserReports(userId: string) {
    const reportsRef = collection(this.firestore, 'reports');
    const q = query(reportsRef, where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      this.reports = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('📜 Reportes cargados:', this.reports); // Verifica en la consola

      if (this.reports.length === 0) {
        this.showToast('No tienes reportes registrados', 'primary');
      }
    } catch (error) {
      console.error('❌ Error al obtener los reportes:', error);
      this.showToast('Error al cargar reportes', 'danger');
    }
  }

  /** 🔥 Eliminar reporte */
  async deleteReport(reportId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'reports', reportId));
      this.reports = this.reports.filter(report => report.id !== reportId);
      this.showToast('Reporte eliminado con éxito', 'success');
    } catch (error) {
      console.error('❌ Error al eliminar reporte:', error);
      this.showToast('No se pudo eliminar el reporte', 'danger');
    }
  }

  /** 🔔 Mostrar mensaje de Toast */
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
