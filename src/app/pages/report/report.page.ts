import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false,
 
})
export class ReportPage implements OnInit {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      ubicacion: ['', Validators.required],
      datetime: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      animal: ['', Validators.required],
      sexo: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      photo: ['', Validators.required],
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
