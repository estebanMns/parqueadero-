import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({ providedIn: 'root' })
export class RolService {
  private readonly url = `${environment.apiUrl}/roles`;

  private rolesList: Rol[] = [
    { tipoRol: 'ADMINISTRADOR', permiso: 'TODO' },
    { tipoRol: 'OPERARIO', permiso: 'LEER_ESCRIBIR' }
  ];

  constructor(private readonly http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url).pipe(
      tap(data => { if (data) this.rolesList = data; }),
      catchError(() => of(this.rolesList))
    );
  }

  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.url}/crearRol`, rol).pipe(
      tap(newRol => {
        this.rolesList.push(newRol);
      }),
      catchError(() => {
        this.rolesList.push(rol);
        return of(rol);
      })
    );
  }

  actualizarRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.url}/actualizarRol`, rol).pipe(
      tap(upRol => {
        const idx = this.rolesList.findIndex(r => r.tipoRol === upRol.tipoRol);
        if (idx !== -1) this.rolesList[idx] = upRol;
      }),
      catchError(() => {
        const idx = this.rolesList.findIndex(r => r.tipoRol === rol.tipoRol);
        if (idx !== -1) this.rolesList[idx] = rol;
        return of(rol);
      })
    );
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminarRol/${id}`).pipe(
      tap(() => {
        this.rolesList.splice(id, 1);
      }),
      catchError(() => {
        this.rolesList.splice(id, 1);
        return of(undefined);
      })
    );
  }
}
