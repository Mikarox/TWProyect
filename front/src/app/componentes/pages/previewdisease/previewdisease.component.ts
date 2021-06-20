import { Component, OnInit, AfterViewInit , ViewEncapsulation} from '@angular/core';


import { DiseasesService } from '../../../services/diseases_service/diseases.service';
import { Diseases } from 'src/app/models/Diseases';
@Component({
  selector: 'app-previewdisease',
  templateUrl: './previewdisease.component.html',
  styleUrls: ['./previewdisease.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewdiseaseComponent implements OnInit, AfterViewInit {
  diseases: any=[];
  diseasesshow: any=[];
  
  constructor(private diseasesService: DiseasesService) { }

  ngOnInit(): void {
    this.diseasesService.getDiseases()
    .subscribe(
      res => {
        this.diseases=res; 
        for(let i=0; i<this.diseases.length;i++){
          var grupo=this.diseases[i].RISK_GROUPS.split(",")
          this.diseases[i].RISK_GROUPS='';
          for(let j=0; j<grupo.length;j++){
            if(grupo[j]=="Bebés y niños"){
              this.diseases[i].RISK_GROUPS+=`<i class="fas fa-baby"></i><i class="fas fa-child"></i>&nbsp;&nbsp;&nbsp;`;
              
            }else if(grupo[j]=="Adultos"){
              this.diseases[i].RISK_GROUPS+=`<i class="fas fa-male"></i><i class="fas fa-female"></i>&nbsp;&nbsp;&nbsp;`;
            }
            else if(grupo[j]=="Ancianos"){
              this.diseases[i].RISK_GROUPS+=`<img class="icon" src="../../../../assets/images/old.svg">&nbsp;&nbsp;&nbsp;`;
            }
            else if(grupo[j]=="Indiferente"){
              this.diseases[i].RISK_GROUPS+=`<p class='txt'>Indiferente</p>`;
            }        
          }
        }
        for(let i=0; i<3;i++){
          this.diseasesshow.push(this.diseases[i]);
        }
      },
      err => console.log(err)
    )
  }
  ngAfterViewInit(): void{
  }
  

}
