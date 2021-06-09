import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navnurse',
  templateUrl: './navnurse.component.html',
  styleUrls: ['./navnurse.component.css']
})
export class NavnurseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  logout(){
    localStorage.removeItem('sesion');
    location.replace('/');
  }
}
