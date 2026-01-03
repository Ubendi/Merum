import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EbikeTourDTO {
  id: number,
  name: string,
  description: string,
  stops: string,
  picturePath: string,
  distanceKm: number,
  duration: string,
  difficulty: string,
  elevationGain: number,
  elevationLoss: number
}

@Injectable({
  providedIn: 'root',
})
export class EbikeToursService {
  private apiUrl = `${environment.apiUrl}/ebikeTours`;

  constructor(private http: HttpClient){}

  getAllEbikeTours(): Observable<EbikeTourDTO[]>{
    return this.http.get<EbikeTourDTO[]>(`${this.apiUrl}/getAllEbikeTours`);
  }

  getEbikeTourById(id: number): Observable<EbikeTourDTO>{
    return this.http.get<EbikeTourDTO>(`${this.apiUrl}/getEbikeTourById/${id}`);
  }
}
