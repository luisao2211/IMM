import { Injectable } from '@angular/core';
import { Activities } from './intefaceactivities';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  route: string = "http://127.0.0.1:8000/api/imm";

  constructor(private http: HttpClient) {}

  NewActivities(Activities: Activities) {
    return this.http.post(`${this.route}/activity`, Activities)
  }

  dataActivities(): Observable<Activities[]> {
    return this.http.get<Activities[]>(`${this.route}/activity`)
  }
  deleteActivities(id:number) {
    return this.http.delete(`${this.route}/activity/${id}`)
  }
  updateActivities(Activities: Activities) {
    return this.http.put(`${this.route}/activity/`,Activities)
  }
}
