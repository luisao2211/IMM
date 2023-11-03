import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ServicesReference } from './servicesrefence.interface';
@Injectable({
  providedIn: 'root'
})
export class ServicesReferenceService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewService(ServicesReference: ServicesReference) {
    return this.http.post(`${this.route}/services`, ServicesReference)
  }

  dataService(): Observable<ServicesReference[]> {
    return this.http.get<ServicesReference[]>(`${this.route}/services`)
  }
  deleteService(id:number) {
    return this.http.delete(`${this.route}/services/${id}`)
  }
  updateService(ServicesReference: ServicesReference) {
    return this.http.put(`${this.route}/services/`,ServicesReference)
  }
}
