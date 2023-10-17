import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Disabilites } from './intefacedisabilities';

@Injectable({
  providedIn: 'root'
})
export class DisabilitesService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewDisabilites(Disabilites: Disabilites) {
    return this.http.post(`${this.route}/disabilities`, Disabilites)
  }

  dataDisabilites(): Observable<Disabilites[]> {
    return this.http.get<Disabilites[]>(`${this.route}/disabilities`)
  }
  deleteDisabilites(id:number) {
    return this.http.delete(`${this.route}/disabilities/${id}`)
  }
  updateDisabilites(Disabilites: Disabilites) {
    return this.http.put(`${this.route}/disabilities/`,Disabilites)
  }
}
