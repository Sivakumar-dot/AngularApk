import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly baseUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  createRole(payload: Omit<Role, 'id'>): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, payload);
  }

  updateRole(id: number, payload: Omit<Role, 'id'>): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${id}`, payload);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
