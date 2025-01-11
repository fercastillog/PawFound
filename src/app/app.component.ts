import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  @Input() title!: string;
  
  constructor() {}

  ngOnInit() {
    
  }
}
