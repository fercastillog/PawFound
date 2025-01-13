import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reportpet',
  templateUrl: './reportpet.page.html',
  styleUrls: ['./reportpet.page.scss'],
  standalone: false,
})
export class ReportpetPage implements OnInit {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
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
      photo: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('Estado inicial del formulario:', this.reportForm.status);
  }

  onReport() {
    if (this.reportForm.valid) {
      console.log('Datos enviados:', this.reportForm.value);
      this.reportForm.reset(); // Vacía el formulario después de enviar
    } else {
      console.log('Formulario inválido');
    }
  }
}
