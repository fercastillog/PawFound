import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Firestore, collection, addDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false,
})
export class ReportPage implements OnInit {
  reportForm: FormGroup;
  photoBase64: string | null = null;
  firestore = inject(Firestore);

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      datetime: ['', Validators.required],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      photo: ['', Validators.required]
    });
  }

  ngOnInit() {}

  /** 📸 Tomar foto con la cámara */
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        this.photoBase64 = `data:image/jpeg;base64,${image.base64String}`;
        this.reportForm.patchValue({ photo: this.photoBase64 });
      }
    } catch (error) {
      console.error('❌ Error al tomar la foto:', error);
      this.showToast('Error al tomar la foto', 'danger');
    }
  }

  /** 🖼️ Seleccionar foto desde la galería */
  async choosePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      if (image.base64String) {
        this.photoBase64 = `data:image/jpeg;base64,${image.base64String}`;
        this.reportForm.patchValue({ photo: this.photoBase64 });
      }
    } catch (error) {
      console.error('❌ Error al seleccionar la foto:', error);
      this.showToast('Error al seleccionar la foto', 'danger');
    }
  }

  /** 📤 Enviar reporte */
  async onReport() {
    if (!this.reportForm.valid) {
      console.warn('⚠️ Formulario inválido, revisa los datos ingresados.');
      return;
    }

    try {
      const db = getFirestore();
      const reportsCollection = collection(db, 'reports');

      await addDoc(reportsCollection, {
        ...this.reportForm.value,
        timestamp: new Date().toISOString(),
      });

      this.showToast('✅ Reporte enviado con éxito', 'success');
      this.reportForm.reset();
      this.photoBase64 = null;
      this.navCtrl.navigateForward('/show-reports'); // Navegar a la página de reportes
    } catch (error) {
      console.error('❌ Error al enviar reporte:', error);
      this.showToast('Error al enviar reporte', 'danger');
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
