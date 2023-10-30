import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CivilState } from './civilstate.interface';

@Injectable({
  providedIn: 'root'
})
export class CivilStateService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewCivilState(civilState: CivilState) {
    return this.http.post(`${this.route}/civilstatus`, civilState)
  }

  dataCivilState(): Observable<CivilState[]> {
    return this.http.get<CivilState[]>(`${this.route}/civilstatus`)
  }
  deleteCivilState(id:number) {
    return this.http.delete(`${this.route}/civilstatus/${id}`)
  }
  updateCivilState(civilState: CivilState) {
    return this.http.put(`${this.route}/civilstatus/`,civilState)
  }
}
