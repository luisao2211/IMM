import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Origin } from './intefaceorigins';

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewOrigin(Origin: Origin) {
    return this.http.post(`${this.route}/origin`, Origin)
  }

  dataOrigin(): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${this.route}/origin`)
  }
  deleteOrigin(id:number) {
    return this.http.delete(`${this.route}/origin/${id}`)
  }
  updateOrigin(Origin: Origin) {
    return this.http.put(`${this.route}/origin/`,Origin)
  }
}
