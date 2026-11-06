import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuesthouseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/guesthouse'

  getAllGuesthouseImages(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/getAllGuesthouseImages`)
  }
}
