import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  email: string = '';

  ngOnInit(): void {
    
    this.email = this.route.snapshot.params.email;
    console.log(this.route.snapshot.params.email);


    


  }

}
