import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model-dto/project.model';
import { Api } from '../model-dto/api.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  getAllProjects(): Observable<Project[]> {  // Sesuaikan tipe kembalian
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
  }

  updateProject(projectId: number, projectDetails: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${projectId}`, projectDetails);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}`);
  }

  createApi(projectId: number, api: Api): Observable<Api> {
    return this.http.post<Api>(`${this.baseUrl}/${projectId}/apis`, api);
  }

  getAllApisByProjectId(projectId: number): Observable<Api[]> {
    return this.http.get<Api[]>(`${this.baseUrl}/${projectId}/apis`);
  }

  updateApi(projectId: number, apiId: number, api: Api): Observable<Api> {
    return this.http.put<Api>(`${this.baseUrl}/${projectId}/apis/${apiId}`, api);
  }

  deleteApi(projectId: number, apiId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}/apis/${apiId}`);
  }

  getApi(projectId: number, apiId: number): Observable<Api> {
    return this.http.get<Api>(`${this.baseUrl}/${projectId}/apis/${apiId}`);
  }
}
