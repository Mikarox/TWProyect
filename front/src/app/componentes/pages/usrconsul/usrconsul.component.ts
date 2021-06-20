import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from '../../../services/users_service/users.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usrconsul',
  templateUrl: './usrconsul.component.html',
  styleUrls: ['./usrconsul.component.css']
})
export class UsrconsulComponent implements OnInit {
  user!: User; 
  ifWants:boolean=false;
  constructor(private userService: UsersService, private router: Router, private  route: ActivatedRoute) { }

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
    if(this.user.WANTS_CONS == "1"){
      $('#btnConsul').prop( "disabled", true );
      this.ifWants=true;
    }
  }
  cancelar(){
    Swal.fire({
      title: '¿Desea cancelar su consulta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.WANTS_CONS='0';
        this.userService.updateUser(this.user.ID_USR, this.user)
        .subscribe(
          res => {
            console.log(res); 
            Swal.fire({
              icon: 'success',
              title: 'Su consulta ha sido cancelada',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              window.location.reload();
            })
          },
          err => console.log(err)
        )
      } 
    })
  }
  consulta(){
    Swal.fire({
      title: '¿Desea solicitar una consulta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.WANTS_CONS='1';
        this.userService.updateUser(this.user.ID_USR, this.user)
        .subscribe(
          res => {
            console.log(res); 
            Swal.fire({
              icon: 'success',
              title: 'Su consulta ha sido solicitada',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              window.location.reload();
            })
          },
          err => console.log(err)
        )
      } 
    })
  }
}
