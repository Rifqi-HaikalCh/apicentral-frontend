import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../model-dto/api.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = '/api/projects';

  constructor(private http: HttpClient) {}
}
