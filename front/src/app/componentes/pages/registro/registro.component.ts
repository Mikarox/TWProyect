import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { ClavesCuenta } from 'src/app/models/ClavesCuenta';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Para el menú de opciones de País 
  countryList: string[] = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
  
  form!: FormGroup; //Formulario reactivo 
  user!: User; //Modelo que se enviará al servidor
  match: boolean = false; //Para encontrar coincidencias en las contraseñas 
  //Para determinar que la fecha límite de cumpleaños sea el día actual
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0');
  yyyy = this.date.getFullYear();
  today: string = this.yyyy+'-'+this.mm+'-'+this.dd;
  //Para trabajar con la imagen 
  public previsualizacion!: string;
  //Para el envío de la foto
  file!: File; //campo necesario para el FromData
  //Asignación de tipo de cuenta 
  claveCuenta: string = '0';//El tipo de usario que se enviará 
  claves= new ClavesCuenta();
  msjNoValido: boolean = false; //Para encontrar coincidencias en las claves


  constructor(private formBuilder:FormBuilder, private userService: UsersService, private sanitizer: DomSanitizer) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      KEY: ['',],
      USR_NAME: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(4),Validators.pattern("^\\S*$")]],
      USR_PASSW: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(4),Validators.pattern("^\\S*$")]],
      PASSW_CONF: ['', [Validators.required]],
      NAME: ['', [Validators.required, Validators.maxLength(50),Validators.minLength(3),Validators.pattern("^[a-zA-ZÀ-ÿ\\u00f1\\u00d\\s\\.]+$")]],
      LASTNAME: ['', [Validators.required, Validators.maxLength(50),Validators.minLength(3),Validators.pattern("^[a-zA-ZÀ-ÿ\\u00f1\\u00d\\s\\.]+$")]],
      BIRTH: ['', [Validators.required]],
      EMAIL: ['', [Validators.email, Validators.required, Validators.maxLength(50),Validators.minLength(8)]],
      PHONE: ['', [Validators.required, Validators.maxLength(12),Validators.minLength(3),Validators.pattern("^[0-9]*$")]],
      COUNTRY: ['', [Validators.required]],
      STREET: ['', [Validators.required, Validators.maxLength(50),Validators.minLength(4)]],
      CITY: ['', [Validators.required, Validators.maxLength(30),Validators.minLength(4)]],
      POSTCODE: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(5),Validators.pattern("^[0-9]*$")]],
      PHOTO: [null,]
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(1)
    )
    .subscribe(value => {
      //Busca coincidencias en las contraseñas
      if(value.USR_PASSW !='' && value.PASSW_CONF !=''){
        if((value.USR_PASSW != value.PASSW_CONF)){
          this.match=true;
        }else{
          this.match=false;
        }
      }
      else{
        this.match=false;
      }
      // Asignación de tipo de cuenta
      if(value.KEY == this.claves.enfermera){
        this.claveCuenta='1';
        this.msjNoValido=false;
      }
      else if(value.KEY == this.claves.doctor){
        this.claveCuenta='2';
        this.msjNoValido=false;
      }
      else{
        this.claveCuenta='0';
        this.msjNoValido=true;
      }
      if(value.KEY.replace(/\s/g, '') == ''){
        this.msjNoValido=false;
      }
    });
  }
  //Visualización de la imagen
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    this.file=event.target.files[0]; //Se alamcena la imagen en el atributo file
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })
  }
  //Convierte la imagen a base 64 para poder visualizarla 
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return;
    } catch (e) {
      return null;
    }
  });
  //Submit 
  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    //Inicia alerta de Sweet
    Swal.fire({
      title: '¿Desea enviar el registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.user = {
          USR_NAME: value.USR_NAME,
          USR_PASSW: value.USR_PASSW,
          USR_TYPE: this.claveCuenta,
          NAME: value.NAME,
          LASTNAME:value.LASTNAME,
          BIRTH: value.BIRTH,
          EMAIL: value.EMAIL,
          PHONE: value.PHONE,
          COUNTRY: value.COUNTRY,
          STREET: value.STREET,
          CITY: value.CITY,
          POSTCODE: value.POSTCODE,
          PHOTO: this.file,
        };
        this.userService.saveUser(this.user)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        )
        Swal.fire({
          title: 'Compruebe su dirección de correo electrónico',
          text: 'Hemos enviado un mensaje a: '+value.EMAIL,
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
          title:'El registro no se envió', 
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
