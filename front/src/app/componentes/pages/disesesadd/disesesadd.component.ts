import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime } from 'rxjs/operators';
import { Diseases } from 'src/app/models/Diseases';
import { DiseasesService } from '../../../services/diseases_service/diseases.service';
import Swal from 'sweetalert2'
import * as jQuery from 'jquery';

@Component({
  selector: 'app-disesesadd',
  templateUrl: './disesesadd.component.html',
  styleUrls: ['./disesesadd.component.css']
})
export class DisesesaddComponent implements OnInit {
  form!: FormGroup; //Formulario reactivo
  diseases!: Diseases; //Modelo que se enviará al servidor
  //Para trabajar con la imagen 
  public previsualizacion!: string;
  //Para el envío de la imagen 
  file!: File; //campo necesario para el FromData

  constructor(private formBuilder:FormBuilder, private diseasesService: DiseasesService, private sanitizer: DomSanitizer) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      NAME: ['', [Validators.required, Validators.maxLength(80)]],
      MEDICAL_TERM: ['', [Validators.required, Validators.maxLength(80)]],
      CAUSES: ['', [Validators.required]],
      SYMPTOM: ['', [Validators.required]],
      TREATMENT: ['', [Validators.required]],
      LETHALITY: ['', [Validators.required]],
      RISK_GROUPS: new FormArray([], Validators.required),
      RECURRENCE: ['', [Validators.required]],
      IMAGE: [null,]
    });
    //Evaluación reactiva
    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
     
    });
  }

  //Manejo del grupo de checkboxes
  onCheckChange(event: any) {
    const formArray: FormArray = this.form.get('RISK_GROUPS') as FormArray;
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
    if($("#check4").is(':checked')) {
      $("#check1").attr("disabled","disabled");
      $("#check2").attr("disabled","disabled");
      $("#check3").attr("disabled","disabled");
    }
    else{
      $("#check1").removeAttr("disabled");
      $("#check2").removeAttr("disabled");
      $("#check3").removeAttr("disabled");
    }
    if($("#check1").is(':checked') || $("#check2").is(':checked') || $("#check3").is(':checked')) {
      $("#check4").attr("disabled","disabled");
    }
    else{
      $("#check4").removeAttr("disabled");
    }
    if($("#check1").is(':checked') && $("#check2").is(':checked') && $("#check3").is(':checked')){
      $("#check1").prop('checked', false);
      $("#check2").prop('checked', false);
      $("#check3").prop('checked', false);
      $("#check1").attr("disabled","disabled");
      $("#check2").attr("disabled","disabled");
      $("#check3").attr("disabled","disabled");

      $("#check4").prop('checked', true);
      $("#check4").removeAttr("disabled");
      formArray.removeAt(0);
      formArray.removeAt(0);
      formArray.removeAt(0);
      formArray.push(new FormControl("Indiferente"));
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

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    //Inicia alerta de Sweet
    Swal.fire({
      title: '¿Desea confirmar el registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.diseases = {
          NAME: value.NAME,
          MEDICAL_TERM: value.MEDICAL_TERM,
          CAUSES: value.CAUSES,
          SYMPTOM: value.SYMPTOM,
          TREATMENT: value.TREATMENT,
          LETHALITY: value.LETHALITY,
          RISK_GROUPS: value.RISK_GROUPS,
          RECURRENCE: value.RECURRENCE,
          IMAGE: this.file
        }
        this.diseasesService.saveDisease(this.diseases)
        .subscribe(
          res => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Registro guardado',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              location.href="http://localhost:4200//doc/";
            })
            
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
