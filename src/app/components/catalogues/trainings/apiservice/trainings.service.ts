import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Training } from './trainings.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  route: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  NeTraining(Training: Training) {
    return this.http.post(`${this.route}/training`, Training)
  }

  dataTraining(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.route}/training`)
  }
  deleteTraining(id:number) {
    return this.http.delete(`${this.route}/training/${id}`)
  }
  updateTraining(Training: Training) {
    return this.http.put(`${this.route}/training/`,Training)
  }
}
