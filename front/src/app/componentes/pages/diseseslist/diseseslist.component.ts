import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/User';
import * as jQuery from 'jquery';

import { DiseasesService } from '../../../services/diseases_service/diseases.service';
import { Diseases } from 'src/app/models/Diseases';
@Component({
  selector: 'app-diseseslist',
  templateUrl: './diseseslist.component.html',
  styleUrls: ['./diseseslist.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DiseseslistComponent implements OnInit {

  user!: User;
  diseases: any=[];

  constructor(private diseasesService: DiseasesService) { }
  ngOnInit(): void {
    if (localStorage.getItem('sesion')) {
      $("#navindex").hide();
    }
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
      },
      err => console.log(err)
    )
  }

}
