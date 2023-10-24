import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Adicctions } from './intefaceaddictions';

@Injectable({
  providedIn: 'root'
})
export class AdicctionsService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewAdicction(Adicctions: Adicctions) {
    return this.http.post(`${this.route}/addictions`, Adicctions)
  }

  dataAdicction(): Observable<Adicctions[]> {
    return this.http.get<Adicctions[]>(`${this.route}/addictions`)
  }
  deleteAdicction(id:number) {
    return this.http.delete(`${this.route}/addictions/${id}`)
  }
  updateAdicction(Adicctions: Adicctions) {
    return this.http.put(`${this.route}/addictions/`,Adicctions)
  }
}
