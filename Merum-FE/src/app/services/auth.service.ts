import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

export interface LoginDTO {
  identifier: string,
  password: string
}

export interface RegisterDTO {
  email: string,
  userName: string,
  password: string,
  confirmPassword: string 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient){}

  login(data: LoginDTO): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, data).pipe(
      tap((res: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', res.token)
        }
      })
    )
  }

  register(data: RegisterDTO){
    return this.http.post(`${this.apiUrl}/auth/register`, data)
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    else {
      return '';
    }
  }

  isLoggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean{
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }
}
