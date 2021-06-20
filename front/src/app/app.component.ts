import { Component, } from '@angular/core';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyect';
  user!: User;

  ngOnInit(): void {
    
  }

  constructor(){
    
  }

  

}


