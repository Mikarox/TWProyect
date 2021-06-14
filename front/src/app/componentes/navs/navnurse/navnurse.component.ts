import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';
import { UsersService } from '../../../services/users_service/users.service';

@Component({
  selector: 'app-navnurse',
  templateUrl: './navnurse.component.html',
  styleUrls: ['./navnurse.component.css']
})
export class NavnurseComponent implements OnInit {
  user!: User;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    if(localStorage.getItem('sesion')){
      const sesion = localStorage.getItem('sesion'); 
      let value = " " + sesion + " ";
      this.user = JSON.parse(value);
      this.userService.getUser(this.user.ID_USR)
      .subscribe(
        res => {
          localStorage.removeItem('sesion');
          localStorage.setItem('sesion', JSON.stringify(res));
          const sesion = localStorage.getItem('sesion'); 
        	let value = " " + sesion + " ";
          this.user = JSON.parse(value);
        },
        err => console.log(err)
      ) 
    }
  }

  
  logout(){
    localStorage.removeItem('sesion');
    location.replace('/');
  }
}
