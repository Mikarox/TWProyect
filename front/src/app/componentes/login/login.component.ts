import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/User';
import { ClavesCuenta } from 'src/app/models/ClavesCuenta';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  form!: FormGroup; //Formulario reactivo 
  login!: User;

  constructor(private formBuilder:FormBuilder, private userService: UsersService, private sanitizer: DomSanitizer) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      USR_NAME: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(4),Validators.pattern("^\\S*$")]],
      USR_PASSW: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(4),Validators.pattern("^\\S*$")]],
    });
    //Evaluación reactiva
    
  }

  sendlogin(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    //Inicia alerta de Sweet
    
        this.login= {
          USR_NAME: value.USR_NAME,
          USR_PASSW: value.USR_PASSW,
        };


        console.log(this.login);
        
  }

}
