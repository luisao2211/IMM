import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Status } from './status.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewStatus(Status: Status) {
    return this.http.post(`${this.route}/status`, Status)
  }

  dataStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.route}/status`)
  }
  deleteStatus(id:number) {
    return this.http.delete(`${this.route}/status/${id}`)
  }
  updateStatus(Status: Status) {
    return this.http.put(`${this.route}/status/`,Status)
  }
}
