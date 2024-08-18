import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class PostmanSwaggerService {
    private apiUrl = 'http://localhost:8090/api/convert/postman-to-swagger'; // Replace with your backend URL
  
    constructor(private http: HttpClient) { }
  
    convertPostmanToSwagger(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
  
      return this.http.post(`${this.apiUrl}/postman-to-swagger`, formData)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    convertPostmanJsonToSwagger(jsonBody: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.post(`${this.apiUrl}/postman-to-swagger`, jsonBody, { headers })
        .pipe(
          catchError(this.handleError)
        );
    }
  
    getApis(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/apis`)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    importPostmanCollection(formData: any, jsonObject: any): Observable<any> {
      const payload = {
        ...formData,
        postmanCollection: jsonObject
      };
  
      return this.http.post(`${this.apiUrl}/import`, payload)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    updateApi(api: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/apis/${api.id}`, api)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    getApiJson(apiId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/apis/${apiId}/json`)
        .pipe(
          catchError(this.handleError)
        );
    }

    // Fungsi untuk mengubah objek JSON dari backend menjadi file JSON untuk diunduh
    downloadJsonFile(jsonObject: any, filename: string): void {
      const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }

    // Fungsi untuk menyimpan objek JSON di local storage
    saveJsonToLocalStorage(key: string, jsonObject: any): void {
      localStorage.setItem(key, JSON.stringify(jsonObject));
    }

    // Fungsi untuk mendapatkan objek JSON dari local storage
    getJsonFromLocalStorage(key: string): any {
      const jsonString = localStorage.getItem(key);
      return jsonString ? JSON.parse(jsonString) : null;
    }
  
    private handleError(error: any) {
      console.error('An error occurred:', error);
      return throwError(error.message || error);
    }
  }
