import { Component, OnInit } from '@angular/core';

import * as jQuery from 'jquery';
@Component({
  selector: 'app-navdoc',
  templateUrl: './navdoc.component.html',
  styleUrls: ['./navdoc.component.css']
})
export class NavdocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  }

  logout(){
    localStorage.removeItem('sesion');
    location.replace('/');
  }

}
