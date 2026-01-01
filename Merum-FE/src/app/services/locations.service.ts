import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LocationDTO {
  id: number,
  title: string,
  name: string,
  city: string,
  area: number,
  soilType: string,
  altitude: string,
  cultivationMode: string,
  grade: string,
  lineDistance: string,
  orientation: string,
  plantationMethod: string,
  year: number,
  grapeVarietyEntityIds: number[],
  latitude: string,
  longitude: string
}

export interface AddLocationDTO {
  name: string,
  title: string,
  city: string,
  area: number,
  soilType: string,
  altitude: string,
  cultivationMode: string,
  grade: string,
  lineDistance: string,
  orientation: string,
  plantationMethod: string,
  year: number,
  grapeVarietyEntityIds: number[],
  latitude: string,
  longitude: string
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

  getLocationById(id: number): Observable<LocationDTO>{
    return this.http.get<LocationDTO>(`${this.apiUrl}/locations/getLocationById/${id}`);
  }

}
