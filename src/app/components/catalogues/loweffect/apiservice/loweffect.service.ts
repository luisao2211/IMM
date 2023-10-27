import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LowEffect } from './loweffect.interface';

@Injectable({
  providedIn: 'root'
})
export class LowEffectService {
  route: string =  "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewLowEffect(LowEffect: LowEffect) {
    return this.http.post(`${this.route}/loweffects`, LowEffect)
  }

  dataLowEffect(): Observable<LowEffect[]> {
    return this.http.get<LowEffect[]>(`${this.route}/loweffects`)
  }
  deleteLowEffect(id:number) {
    return this.http.delete(`${this.route}/loweffects/${id}`)
  }
  updateLowEffect(LowEffect: LowEffect) {
    return this.http.put(`${this.route}/loweffects/`,LowEffect)
  }
}
