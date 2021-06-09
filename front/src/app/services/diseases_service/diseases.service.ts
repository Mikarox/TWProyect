import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Diseases } from '../../models/Diseases'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseasesService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getDiseases(): Observable<Diseases>{
    return this.http.get(`${this.API_URI}/diseases`)
  }
  getDisease(id: string): Observable<Diseases>{
    return this.http.get(`${this.API_URI}/diseases/${id}`);
  }
  deleteDisease(id: string): Observable<Diseases>{
    return this.http.delete(`${this.API_URI}/diseases/${id}`);
  }
  saveDisease(disease: Diseases): Observable<Diseases>{  
    const fd = new FormData();
    fd.append('NAME', disease.NAME || '');
    fd.append('MEDICAL_TERM', disease.MEDICAL_TERM || '');
    fd.append('CAUSES', disease.CAUSES || '')
    fd.append('SYMPTOM', disease.SYMPTOM || '');
    fd.append('TREATMENT', disease.TREATMENT || '');
    fd.append('LETHALITY', disease.LETHALITY || '');
    fd.append('RISK_GROUPS', disease.RISK_GROUPS || '');
    fd.append('RECURRENCE', disease.RECURRENCE || '');
    fd.append('IMAGE', disease.IMAGE || '');

    return this.http.post(`${this.API_URI}/diseases/`, fd);
  }
  updateDisease(id: string, updateDisease: Diseases): Observable<Diseases>{
    return this.http.put(`${this.API_URI}/diseases/${id}`, updateDisease);
  }
}
