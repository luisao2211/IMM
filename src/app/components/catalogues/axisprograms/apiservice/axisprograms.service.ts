import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AxisPrograms } from './axisprograms.interface';


@Injectable({
  providedIn: 'root'
})
export class AxisProgramsService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewAxisProgram(AxisPrograms: AxisPrograms) {
    return this.http.post(`${this.route}/axisprogram`, AxisPrograms)
  }

  dataAxisProgram(): Observable<AxisPrograms[]> {
    return this.http.get<AxisPrograms[]>(`${this.route}/axisprogram`)
  }
  deleteAxisProgram(id:number) {
    return this.http.delete(`${this.route}/axisprogram/${id}`)
  }
  updateAxisProgram(AxisPrograms: AxisPrograms) {
    return this.http.put(`${this.route}/axisprogram/`,AxisPrograms)
  }
}
