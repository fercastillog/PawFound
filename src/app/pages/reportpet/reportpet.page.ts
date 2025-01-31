import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private firestore: AngularFirestore
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      datetime: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      reward: ['', [Validators.required, Validators.min(0)]],
      photo: ['']
    });
  }

  ngOnInit() {}

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

  async onReport() {
    if (this.reportForm.valid) {
      await this.firestore.collection('reports').add({
        ...this.reportForm.value,
        timestamp: new Date().toISOString(),
      });

      this.showToast('Reporte enviado con éxito', 'success');
      this.reportForm.reset();
      this.photoBase64 = null;
      this.navCtrl.navigateForward('/profile');
    }
  }

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
