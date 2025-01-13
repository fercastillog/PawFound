import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: false,
})
export class ReportPage implements OnInit {

  reportForm: FormGroup;

  constructor(private fb: FormBuilder, private  navCtrl: NavController) { 
    this.reportForm = this.fb.group({
    name: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
    ubicacion: ['', Validators.required],
    datetime: ['', Validators.required],
    phone: ['', Validators.required, Validators.pattern('[0-9]{9}')],
    animal: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required]


    });
  }

  ngOnInit() {
  }

  onReport(){
    if(this.reportForm.valid){
      const { name, ubicacion, datetime, phone, animal, description, image } = this.reportForm.value;
      console.log('Report: ',name, ubicacion, datetime, phone, animal, description, image);
      // Aquí se llamará al AuthService para manejar la autenticación
      // Redireccionara a la pagina home o where ever...
    }
  }

}
