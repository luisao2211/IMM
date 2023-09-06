import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Households } from './intefacehouseholds';

@Injectable({
  providedIn: 'root'
})
export class HouseHoldService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NewHouseHold(Households: Households) {
    return this.http.post(`${this.route}/households`, Households)
  }

  dataHouseHold(): Observable<Households[]> {
    return this.http.get<Households[]>(`${this.route}/households`)
  }
  deleteHouseHold(id:number) {
    return this.http.delete(`${this.route}/households/${id}`)
  }
  updateHouseHold(Households: Households) {
    return this.http.put(`${this.route}/households/`,Households)
  }
}
