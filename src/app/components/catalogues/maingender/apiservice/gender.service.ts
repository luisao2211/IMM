import { Injectable } from '@angular/core';
import { Gender } from './intefacegender';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewGender(gender: Gender) {
    return this.http.post(`${this.route}/genders`, gender)
  }

  dataGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.route}/genders`)
  }
  deleteGender(id:number) {
    return this.http.delete(`${this.route}/genders/${id}`)
  }
  updateGender(gender: Gender) {
    return this.http.put(`${this.route}/genders/`,gender)
  }
  allGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.route}/genders/selectIndex`)
  }
}
