import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users_service/users.service';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-wantsconsult',
  templateUrl: './wantsconsult.component.html',
  styleUrls: ['./wantsconsult.component.css']
})
export class WantsconsultComponent implements OnInit {
  users: any=[];
  patients: any=[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe(
      res => {
        this.users=res;
        for(let i=0; i<this.users.length;i++){
          if(this.users[i].USR_TYPE=="0" && this.users[i].IS_REG=="1" && this.users[i].WANTS_CONS=="1"){
            this.patients.push(this.users[i]);
          }
        }
      },
      err => console.log(err)
    )
  }

}
