import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuesthouseService {
  private apiUrl = environment.apiUrl+'/guesthouse'

  constructor(private http: HttpClient){}

  getAllGuesthouseImages(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/getAllGuesthouseImages`)
  }
}
