import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user!: User;
  constructor() {
    if(localStorage.getItem('sesion')){
    const sesion = localStorage.getItem('sesion'); 
    let value = " " + sesion + " ";
    this.user = JSON.parse(value);

    console.log('hola dpt');
    
    if(this.user.USR_TYPE=='0'){
      location.replace('/usr');
    }
    if(this.user.USR_TYPE=='1'){
      location.replace('/nurse');
    }
    if(this.user.USR_TYPE=='2'){
      location.replace('/doc/');
    }
          

  }else{  
    
    
  } 

}

  ngOnInit(): void {
  }

}
