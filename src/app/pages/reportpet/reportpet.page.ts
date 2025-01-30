import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Importación correcta para Firestore en versión modular
import { inject } from '@angular/core'; // Necesario para la nueva inyección modular

@Component({
  selector: 'app-reportpet',
  templateUrl: './reportpet.page.html',
  styleUrls: ['./reportpet.page.scss'],
  standalone: false,
})
export class ReportpetPage implements OnInit {
  reportForm: FormGroup;
  photoBase64: string | null = null;
  firestore = inject(Firestore); // Usando la inyección modular de Firestore

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      datetime: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      reward: ['', [Validators.required, Validators.min(0)]],
      photo: ['', Validators.required]  // Foto como campo obligatorio
    });
  }

  ngOnInit() {
    console.log('Estado inicial del formulario:', this.reportForm.status);
  }

  // Método para tomar una foto
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
          photo: this.photoBase64  // Asignar la foto base64 al formulario
        });
      }
    } catch (error: any) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Método para seleccionar una foto de la galería
  async choosePhoto() {
    try {
      const image = await Camera.pickImages({
        quality: 90
      });

      if (image.photos.length > 0) {
        const selectedImage = image.photos[0];
        this.photoBase64 = selectedImage.webPath ? selectedImage.webPath : null;
        this.reportForm.patchValue({
          photo: this.photoBase64  // Asignar la foto seleccionada al formulario
        });
      }
    } catch (error: any) {
      console.error('Error al seleccionar la foto:', error);
    }
  }

  // Enviar el formulario
  async onReport() {
    if (this.reportForm.valid) {
      console.log('Datos enviados:', this.reportForm.value);

      try {
        // Obtener la colección 'reports' en Firestore
        const reportsCollection = collection(this.firestore, 'reports');

        // Agregar el documento con los datos del formulario
        await addDoc(reportsCollection, {
          name: this.reportForm.value.name,
          ubicacion: this.reportForm.value.ubicacion,
          phone: this.reportForm.value.phone,
          animal: this.reportForm.value.animal,
          sexo: this.reportForm.value.sexo,
          raza: this.reportForm.value.raza,
          edad: this.reportForm.value.edad,
          description: this.reportForm.value.description,
          reward: this.reportForm.value.reward,
          photo: this.reportForm.value.photo,  // La foto que se capturó o seleccionó
          datetime: this.reportForm.value.datetime  // La fecha y hora si está configurado
        });

        console.log('Reporte guardado correctamente en Firebase');
        this.reportForm.reset();  // Restablecer el formulario
        this.navCtrl.navigateForward('/profile');  // Navegar a otra página si es necesario

      } catch (error: any) {
        console.error('Error al guardar los datos en Firebase:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
