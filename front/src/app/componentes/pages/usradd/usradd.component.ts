import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Patients } from 'src/app/models/Patients'
import { UsersService } from '../../../services/users_service/users.service';
import { PatientsService } from '../../../services/patients_service/patients.service'
import Swal from 'sweetalert2'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usradd',
  templateUrl: './usradd.component.html',
  styleUrls: ['./usradd.component.css']
})
export class UsraddComponent implements OnInit {

  //Para el menú de opciones de País 
  countryList: string[] = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];

  histoMedi: string[] = ["Alergias","Anemia","Angina","Ansiedad","Artritis","Asma","Accidente cerebro vascular","Coágulos en la sangre","Cáncer","Depresión","Diabetes","Enfermedad Arterial Coronaria" ,"Enfermedad de Crohn","Enfermedad del hígado","Enfermedad Pulmonar","Epilepcia","Fibrilación	auricular","Hepatitis	C","Hipertensión","Infarto	Agudo	del	Miocardio","Insuficiencia Renal","Migrañas","Osteoartritis","Osteoporosis","Reflujo	Gastro-esofágico","Síndrome	del	Intestino	Irritable	","Tiroides","Ulcera	péptica","Vesícula Biliar"];
  
  form!: FormGroup; //Formulario reactivo 
  form2!: FormGroup; //Formulario reactivo para paceinte
  user!: User; //Modelo que se enviará al servidor
  patient!: Patients;
  usrPhoto:any;
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
  //Para buscar coincidencias en la base de datos  
  existeUsrName: boolean = false;
  existeEmail: boolean = false;

   patientid:any;//Variable que almacena el id del usario 

  formuEditado: boolean=false; //Idetifica se se relizó una edición en el formualrio de usario

  constructor(private formBuilder:FormBuilder,private formBuilder2:FormBuilder, private userService: UsersService, private patientService: PatientsService, private sanitizer: DomSanitizer){
    this.buildForm();
    this.buildForm2();
  }

  ngOnInit(): void {
  }
  
  private buildForm() {
    this.form = this.formBuilder.group({
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
      debounceTime(500)
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
      //Verificar si existen coincidencias en la base de datos 
      if(value.USR_NAME){
        this.userService.verifyName(value.USR_NAME)
        .subscribe(
          res => {
            if(JSON.parse(JSON.stringify(res)).message =='Existe'){
              this.existeUsrName=true;
            }else if(JSON.parse(JSON.stringify(res)).message=='No existe'){
              this.existeUsrName=false;
            }
          },
          err => console.log(err)
        )
      }
      if(value.EMAIL){
        this.userService.verifyEmail(value.EMAIL)
        .subscribe(
          res => {
            if(JSON.parse(JSON.stringify(res)).message =='Existe'){
              this.existeEmail=true;
            }else if(JSON.parse(JSON.stringify(res)).message=='No existe'){
              this.existeEmail=false;
            }
          },
          err => console.log(err)
        )
      }
    });
  }

    private buildForm2() {
    this.form2 = this.formBuilder2.group({
      SEX: ['', [Validators.required]],
      AGE: ['', [Validators.required,Validators.maxLength(3),Validators.pattern("^[0-9]*$")]],
      HEIGHT: ['',[Validators.required,,Validators.maxLength(7),Validators.pattern("^[0-9\\.]*$")]],
      WEIGHT: ['',[Validators.required,,Validators.maxLength(7),Validators.pattern("^[0-9\\.]*$")]],
      PRESSURE: ['',[Validators.required,,Validators.maxLength(9),Validators.pattern("^[0-9]+/[0-9]+$")]],
      BREATHING: ['',[Validators.required,,Validators.maxLength(9),Validators.pattern("^[0-9]+\\s+a+\\s[0-9]+$")]],
      PULSE: ['',[Validators.required,,Validators.maxLength(9),Validators.pattern("^[0-9]+\\s+y+\\s[0-9]+$")]],
      TEMPERATURE: ['',[Validators.required,,Validators.maxLength(7),Validators.pattern("^[0-9\\.]*$")]],
      REASON: ['', [Validators.required]],
      NOTES: ['',],
      HISTORY: new FormArray([], ),
    });
    //Evaluación reactiva
    this.form2.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value2 => {
    });
  }
 //Manejo del grupo de checkboxes
  onCheckChange(event: any) {
    const formArray: FormArray = this.form2.get('HISTORY') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }else{
      let i: number = 0;
      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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
    const value2 = this.form2.value;
    //Inicia alerta de Sweet
    Swal.fire({
      title: '¿Desea guardar el registro del paciente?',
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
          USR_TYPE: "0",
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
          IS_REG: "1",
          WANTS_CONS: "1",
        }; 
        this.userService.saveUser(this.user)
        .subscribe(
          res => {
            this.patient ={
              ID_USR: JSON.parse(JSON.stringify(res)).id,
              SEX: value2.SEX,
              AGE: value2.AGE,
              HEIGHT: value2.HEIGHT, 
              WEIGHT: value2.WEIGHT, 
              PRESSURE: value2.PRESSURE, 
              BREATHING: value2.BREATHING, 
              PULSE: value2.PULSE, 
              TEMPERATURE: value2.TEMPERATURE,
              REASON: value2.REASON,
              NOTES: value2.NOTES,
              HISTORY: value2.HISTORY,
            }
            this.patientService.savePatient(this.patient)
            .subscribe(
              res => {
                console.log(res); 
                Swal.fire({
                  icon: 'success',
                  title: 'Registro guardado',
                  showConfirmButton: false,
                  timer: 1500
                }).then(()=>{
                  location.href="http://localhost:4200//nurse/";
                })

              },
              err => console.log(err)
            )
          },
          err => console.log(err)
        ) 
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
