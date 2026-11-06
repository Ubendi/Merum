import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UploadResponse {
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  uploadFile(file: File, folder: string, subFolder: string, desiredName?: string): Observable<UploadResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('subFolder', subFolder);
    formData.append('folder', folder);
    if (desiredName) {
      formData.append('desiredName', desiredName);
    }

    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
  }
}
