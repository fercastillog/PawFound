import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

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
    private navCtrl: NavController
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      photo: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        this.photoBase64 = image.base64String;
        this.reportForm.patchValue({
          photo: this.photoBase64
        });
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async choosePhoto() {
    try {
      const image = await Camera.pickImages({
        quality: 90
      });

      if (image.photos.length > 0) {
        const selectedImage = image.photos[0];
        this.photoBase64 = selectedImage.webPath ? selectedImage.webPath : null;
        this.reportForm.patchValue({
          photo: this.photoBase64
        });
      }
    } catch (error) {
      console.error('Error al seleccionar la foto:', error);
    }
  }

  async onReport() {
    if (this.reportForm.valid) {
      try {
        const reportsCollection = collection(this.firestore, 'reports');
        await addDoc(reportsCollection, this.reportForm.value); // Guardar los datos en Firestore
        console.log('Reporte guardado correctamente');
        this.reportForm.reset();
        this.navCtrl.navigateForward('/show-reports'); // Navegar a la página donde se muestran los reports
      } catch (error) {
        console.error('Error al guardar los datos:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
