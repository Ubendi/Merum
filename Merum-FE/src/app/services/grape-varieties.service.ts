import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface GrapeVarietyDTO {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class GrapeVarietiesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllGrapeVarieties(): Observable<GrapeVarietyDTO[]>{
    return this.http.get<GrapeVarietyDTO[]>(`${this.apiUrl}/grapeVarieties/getAllGrapeVarieties`);
  }

  getGrapeVarietyById(id: number): Observable<GrapeVarietyDTO>{
    return this.http.get<GrapeVarietyDTO>(`${this.apiUrl}/grapeVarieties/getGrapeVarietyById/${id}`)
  }
}
