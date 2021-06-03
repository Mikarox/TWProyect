import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/User';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UsersService) {

  }

  email: string = '';

  ngOnInit(): void {
    
    this.email = this.route.snapshot.params.email;
  }

  

}
