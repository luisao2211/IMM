import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {Problems} from './problems.inteface'
@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  route: string =  "https://api.gomezpalacio.gob.mx/api/imm";

  constructor(private http: HttpClient) {}

  NewProblems(Problems: Problems) {
    return this.http.post(`${this.route}/problem`, Problems)
  }

  dataProblems(): Observable<Problems[]> {
    return this.http.get<Problems[]>(`${this.route}/problem`)
  }
  deleteProblems(id:number) {
    return this.http.delete(`${this.route}/problem/${id}`)
  }
  updateProblems(Problems: Problems) {
    return this.http.put(`${this.route}/problem/`,Problems)
  }
}
