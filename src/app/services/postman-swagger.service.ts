import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostmanSwaggerService {
  private apiUrl = 'http://localhost:8090/api/convert/postman-to-swagger';

  constructor(private http: HttpClient) { }

  convertPostmanJsonToSwagger(jsonBody: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}`, jsonBody, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  downloadJsonFile(jsonObject: any, filename: string): void {
    const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.message || error);
  }
}