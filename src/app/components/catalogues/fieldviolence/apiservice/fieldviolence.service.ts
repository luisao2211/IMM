import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { FieldViolence } from './fieldviolence.interface';

@Injectable({
  providedIn: 'root'
})
export class FieldViolenceService {
  route: string =  "http://127.0.0.1:8000/api/imm";

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
