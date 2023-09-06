import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TypeViolence } from './typeviolence.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeViolenceService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NeTypeViolence(TypeViolence: TypeViolence) {
    return this.http.post(`${this.route}/typesviolences`, TypeViolence)
  }

  dataTypeViolence(): Observable<TypeViolence[]> {
    return this.http.get<TypeViolence[]>(`${this.route}/typesviolences`)
  }
  deleteTypeViolence(id:number) {
    return this.http.delete(`${this.route}/typesviolences/${id}`)
  }
  updateTypeViolence(TypeViolence: TypeViolence) {
    return this.http.put(`${this.route}/typesviolences/`,TypeViolence)
  }
}
