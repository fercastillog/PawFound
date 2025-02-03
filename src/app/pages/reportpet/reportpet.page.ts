import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Firestore, collection, addDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-reportpet',
  templateUrl: './reportpet.page.html',
  styleUrls: ['./reportpet.page.scss'],
  standalone: false,
})
export class ReportpetPage implements OnInit {
  reportForm: FormGroup;
  photoBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastController: ToastController,
    private firestore: Firestore
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      datetime: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      reward: ['', [Validators.required, Validators.min(0)]],
      photo: [''],
    });
  }

  ngOnInit() {}

  /** 🔹 Tomar foto con la cámara */
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    if (image.base64String) {
      this.photoBase64 = `data:image/jpeg;base64,${image.base64String}`;
      this.reportForm.patchValue({ photo: this.photoBase64 });
    }
  }

  /** 🔹 Elegir foto desde la galería */
  async choosePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image.base64String) {
      this.photoBase64 = `data:image/jpeg;base64,${image.base64String}`;
      this.reportForm.patchValue({ photo: this.photoBase64 });
    }
  }

  /** 🔹 Enviar reporte */
  async onReport() {
    if (!this.reportForm.valid) {
      console.warn('⚠️ Formulario inválido, revisa los datos ingresados.');
      console.table(this.reportForm.value);
      return;
    }

    try {
      const db = getFirestore();
      const reportsCollection = collection(db, 'reports');

      await addDoc(reportsCollection, {
        ...this.reportForm.value,
        timestamp: new Date().toISOString(),
      });

      this.showToast('📌 Reporte enviado con éxito', 'success');
      this.reportForm.reset();
      this.photoBase64 = null;
      this.navCtrl.navigateForward('/paw-found');
    } catch (error) {
      console.error('❌ Error al enviar reporte:', error);
      this.showToast('🚨 Error al enviar reporte', 'danger');
    }
  }

  /** 🔹 Mostrar mensaje */
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
