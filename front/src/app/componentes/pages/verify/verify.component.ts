import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users_service/users.service';

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
    this.userService.valityUser(this.email).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
