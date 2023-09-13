import { Injectable } from '@angular/core';
import { Gender } from './intefacegender';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  route: string = environment.apiUrl;

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
