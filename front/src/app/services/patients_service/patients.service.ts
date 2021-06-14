import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Patients } from '../../models/Patients'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor
  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patients>{
    return this.http.get(`${this.API_URI}/patients`)
  }
  getPatient(id: string): Observable<Patients>{
    return this.http.get(`${this.API_URI}/patients/${id}`);
  }
  deletePatient(id: string): Observable<Patients>{
    return this.http.delete(`${this.API_URI}/patients/${id}`);
  }
   savePatient(patient: Patients): Observable<Patients>{  
    return this.http.post(`${this.API_URI}/patients/`, patient);
  }
  updatePatient(id: string, updatePatient: Patients): Observable<Patients>{
    return this.http.put(`${this.API_URI}/patients/${id}`, updatePatient);
  }
}
