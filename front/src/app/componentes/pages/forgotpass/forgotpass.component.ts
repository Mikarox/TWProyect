import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2'
import { recover } from 'src/app/models/recover';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})


export class ForgotpassComponent implements OnInit {

  formusr!: FormGroup; //Formulario reactivo 
  userrec!: recover; 
  constructor(private formBuilder:FormBuilder, private userService: UsersService, private sanitizer: DomSanitizer) {
    this.usrform();
   }

   ngOnInit(): void {

    
  }


  private usrform() {
    this.formusr = this.formBuilder.group({
      USR_NAME: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(4),Validators.pattern("^\\S*$")]],
      EMAIL: ['', [Validators.email, Validators.required, Validators.maxLength(50),Validators.minLength(8)]],
    });

    this.formusr.valueChanges;
  }

 
  senddata(event: Event) {
    event.preventDefault();
    const value = this.formusr.value;
    //Inicia alerta de Sweet
    Swal.fire({
      title: '¿Desea restablecer Contraseña?',
      html: `Del Usuario:` + value.USR_NAME +
        `<br> con correo: ` + value.EMAIL,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.userrec = {
          USR_NAME: value.USR_NAME,
          EMAIL: value.EMAIL,
        };
        this.userService.rescuePass(this.userrec);

        Swal.fire({
          title: 'Compruebe su bandeja de correo electrónico',
          html: 'Si las credenciales coinciden recibira' +
          'un enlace para restablecer su contraseña <br><br> ' +
          '<b>Nota:</b> Recuerda revisar tu bandeja de correo no deseado.',
          imageUrl: '../../../../assets/images/correo.png',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonText: `OK`,
          confirmButtonColor: '#0d6efd',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
      } else if (result.isDenied) {
        Swal.fire({
          title: 'La recuperacion ah sido cancelada',
          icon: 'info',
          confirmButtonText: `OK`,
          confirmButtonColor: '#0d6efd',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
      }
    })
  }
}
