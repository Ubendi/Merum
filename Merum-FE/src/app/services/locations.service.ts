import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LocationDTO {
  id: number,
  name: string,
  city: string,
  area: number,
  desc: string
}

export interface AddLocationDTO {
  name: string,
  city: string,
  area: number,
  desc: string
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addLocation(addLocationDTO: AddLocationDTO): Observable<LocationDTO>{
    return this.http.post<LocationDTO>(`${this.apiUrl}/locations/addLocation`, addLocationDTO);
  }

  getAllLocations(): Observable<LocationDTO[]>{
    return this.http.get<LocationDTO[]>(`${this.apiUrl}/locations/getAllLocations`);
  }

}
