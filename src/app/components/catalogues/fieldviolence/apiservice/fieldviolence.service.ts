import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FieldViolence } from './fieldviolence.interface';

@Injectable({
  providedIn: 'root'
})
export class FieldViolenceService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NewFieldViolence(FieldViolence: FieldViolence) {
    return this.http.post(`${this.route}/fieldviolence`, FieldViolence)
  }

  dataFieldViolence(): Observable<FieldViolence[]> {
    return this.http.get<FieldViolence[]>(`${this.route}/fieldviolence`)
  }
  deleteFieldViolence(id:number) {
    return this.http.delete(`${this.route}/fieldviolence/${id}`)
  }
  updateFieldViolence(FieldViolence: FieldViolence) {
    return this.http.put(`${this.route}/fieldviolence/`,FieldViolence)
  }
}
