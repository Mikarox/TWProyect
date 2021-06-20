import { Component, OnInit } from '@angular/core';

import { DiseasesService } from '../../../services/diseases_service/diseases.service';
import { Diseases } from 'src/app/models/Diseases';
@Component({
  selector: 'app-previewdisease',
  templateUrl: './previewdisease.component.html',
  styleUrls: ['./previewdisease.component.css']
})
export class PreviewdiseaseComponent implements OnInit {
  diseases: any=[];
  
  constructor(private diseasesService: DiseasesService) { }

  ngOnInit(): void {
    this.diseasesService.getDiseases()
    .subscribe(
      res => {
        this.diseases=res;
      },
      err => console.log(err)
    )
  }

}
