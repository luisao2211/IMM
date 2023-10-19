import { Injectable } from '@angular/core';
import { Diseases } from './intefacediseases';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewDiseases(Diseases: Diseases) {
    return this.http.post(`${this.route}/diseas`, Diseases)
  }

  dataDiseases(): Observable<Diseases[]> {
    return this.http.get<Diseases[]>(`${this.route}/diseas`)
  }
  deleteDiseases(id:number) {
    return this.http.delete(`${this.route}/diseas/${id}`)
  }
  updateDiseases(Diseases: Diseases) {
    return this.http.put(`${this.route}/diseas/`,Diseases)
  }
}
