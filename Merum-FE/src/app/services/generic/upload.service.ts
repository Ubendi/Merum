import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient){ }

  uploadFile(file: File, folder: string, subFolder: string): Observable <any> {
    const formData: FormData = new FormData();
    formData.append('file',file,file.name);
    formData.append('subFolder',subFolder);
    formData.append('folder',folder);

    return this.http.post(`${this.apiUrl}/upload`,formData);
  }
}
