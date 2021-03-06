import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/User'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URI = 'http://localhost:3000/api' //Como atributo la dirección del servidor

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User> {
    return this.http.get(`${this.API_URI}/users`)
  }
  getUser(id: any): Observable<User> {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }
  saveUser(user: User): Observable<User> {
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
    fd.append('PHOTO', user.PHOTO || ''),
    fd.append('IS_REG', user.IS_REG || ''),
    fd.append('WANTS_CONS', user.WANTS_CONS || '')

    return this.http.post(`${this.API_URI}/users/`, fd);
  }
  verifyName(name: string){
    return this.http.get(`${this.API_URI}/users/verify-userName/${name}`);
  }
  verifyEmail(email: string){
    return this.http.get(`${this.API_URI}/users/verify-userEmail/${email}`);
  }
  updateUser(id: any, updateUser: User): Observable<User>{
    const fd = new FormData();
    fd.append('USR_NAME', updateUser.USR_NAME || '');
    fd.append('USR_PASSW', updateUser.USR_PASSW || '');
    fd.append('USR_TYPE', updateUser.USR_TYPE || '')
    fd.append('NAME', updateUser.NAME || '');
    fd.append('LASTNAME', updateUser.LASTNAME || '');
    fd.append('BIRTH', updateUser.BIRTH || '');
    fd.append('EMAIL', updateUser.EMAIL || '');
    fd.append('PHONE', updateUser.PHONE || '');
    fd.append('COUNTRY', updateUser.COUNTRY || '');
    fd.append('STREET', updateUser.STREET || '');
    fd.append('CITY', updateUser.CITY || '');
    fd.append('POSTCODE', updateUser.POSTCODE || '');
    fd.append('PHOTO', updateUser.PHOTO || ''),
    fd.append('IS_REG', updateUser.IS_REG || ''),
    fd.append('WANTS_CONS', updateUser.WANTS_CONS || '')
    return this.http.put(`${this.API_URI}/users/${id}`, fd);
  }

  valityUser(email: string): Observable<User> {
    return this.http.get(`${this.API_URI}/users/verify/${email}`);
  }

  rescuePass(user: User): Observable<User> {
    return this.http.post(`${this.API_URI}/users/forgotpass`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post(`${this.API_URI}/users/login`, user);
  }




}
