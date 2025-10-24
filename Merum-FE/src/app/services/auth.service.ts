import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

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
  private apiUrl = environment.apiUrl;
  private isBrowser: boolean

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ){
    this.isBrowser = isPlatformBrowser(this.platformId)
  }

  login(data: LoginDTO): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, data).pipe(
      tap((res: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          if(this.isBrowser){
            localStorage.setItem('token', res.token);
          }
        }
      })
    )
  }

  register(data: RegisterDTO){
    return this.http.post(`${this.apiUrl}/auth/register`, data)
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean{
    if(!this.isBrowser) return false;

    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean{
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}
