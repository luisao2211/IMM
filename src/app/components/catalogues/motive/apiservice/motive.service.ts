import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {Motive} from './motive.interface'
@Injectable({
  providedIn: 'root'
})
export class MotiveService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewMotive(Motive: Motive) {
    return this.http.post(`${this.route}/motive`, Motive)
  }

  dataMotive(): Observable<Motive[]> {
    return this.http.get<Motive[]>(`${this.route}/motive`)
  }
  deleteMotive(id:number) {
    return this.http.delete(`${this.route}/motive/${id}`)
  }
  updateMotive(Motive: Motive) {
    return this.http.put(`${this.route}/motive/`,Motive)
  }
}
