import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor

  constructor(private http: HttpClient) { 
    
  }

  getUsers(): Observable<User>{
    return this.http.get(`${this.API_URI}/users`)
  }
  getUser(id: string): Observable<User>{
    return this.http.get(`${this.API_URI}/users/${id}`);
  }
  deleteUser(id: string): Observable<User>{
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }
  saveUser(user: User): Observable<User>{  
    const fd = new FormData();
    fd.append('USR_NAME', user.USR_NAME || '');
    fd.append('USR_PASSW', user.USR_PASSW || '');
    fd.append('USR_TYPE', user.USR_TYPE || '')
    fd.append('NAME', user.NAME || '');
    fd.append('LASTNAME', user.LASTNAME || '');
    fd.append('BIRTH', user.BIRTH || '');
    fd.append('EMAIL', user.EMAIL || '');
    fd.append('PHONE', user.PHONE || '');
    fd.append('COUNTRY', user.COUNTRY || '');
    fd.append('STREET', user.STREET || '');
    fd.append('CITY', user.CITY || '');
    fd.append('POSTCODE', user.POSTCODE || '');
    fd.append('PHOTO', user.PHOTO || '')

    return this.http.post(`${this.API_URI}/users/`, fd);
  }
  updateUser(id: string, updateUser: User): Observable<User>{
    return this.http.put(`${this.API_URI}/users/${id}`, updateUser);
  }

  valityUser(email: string): Observable<User>{
    return this.http.get(`${this.API_URI}/users/verify/${email}`);
  }



}
