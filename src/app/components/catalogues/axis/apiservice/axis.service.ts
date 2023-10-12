import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Axis } from './axis.interface';

@Injectable({
  providedIn: 'root'
})
export class AxisService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewAxis(Axis: Axis) {
    return this.http.post(`${this.route}/axis`, Axis)
  }
  SelectedIndex(): Observable<Axis[]> {
    return this.http.get<Axis[]>(`${this.route}/axis/selectIndex`)
  }
  
  dataAxis(): Observable<Axis[]> {
    return this.http.get<Axis[]>(`${this.route}/axis`)
  }
  deleteAxis(id:number) {
    return this.http.delete(`${this.route}/axis/${id}`)
  }
  updateAxis(Axis: Axis) {
    return this.http.put(`${this.route}/axis/`,Axis)
  }
}
