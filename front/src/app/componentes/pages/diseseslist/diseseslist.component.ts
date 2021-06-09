import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-diseseslist',
  templateUrl: './diseseslist.component.html',
  styleUrls: ['./diseseslist.component.css']
})
export class DiseseslistComponent implements OnInit {

  user!: User;

  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      $("#navindex").hide();
    }
  }

}
