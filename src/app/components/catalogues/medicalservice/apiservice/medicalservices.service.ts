import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { MedicalService } from './medicalservices.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NeWorkPlace(MedicalService: MedicalService) {
    return this.http.post(`${this.route}/medicalservice`, MedicalService)
  }

  dataWorkPlace(): Observable<MedicalService[]> {
    return this.http.get<MedicalService[]>(`${this.route}/medicalservice`)
  }
  deleteWorkPlace(id:number) {
    return this.http.delete(`${this.route}/medicalservice/${id}`)
  }
  updateWorkPlace(MedicalService: MedicalService) {
    return this.http.put(`${this.route}/medicalservice/`,MedicalService)
  }
}
