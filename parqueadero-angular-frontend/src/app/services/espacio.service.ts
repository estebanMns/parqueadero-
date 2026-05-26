import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Espacio } from '../models/espacio.model';

@Injectable({ providedIn: 'root' })
export class EspacioService {
  private readonly url = `${environment.apiUrl}/espacios`;

  private espaciosList: Espacio[] = [
    { id: 1, nivel: 'Nivel 1 — Sótano', numero: 1, estado: true },
    { id: 2, nivel: 'Nivel 1 — Sótano', numero: 2, estado: true },
    { id: 3, nivel: 'Nivel 1 — Sótano', numero: 3, estado: false },
    { id: 4, nivel: 'Nivel 1 — Sótano', numero: 4, estado: false },
    { id: 5, nivel: 'Nivel 2 — Planta', numero: 1, estado: true },
    { id: 6, nivel: 'Nivel 2 — Planta', numero: 2, estado: false },
    { id: 7, nivel: 'Nivel 3 — Piso 1', numero: 1, estado: true }
  ];

  constructor(private readonly http: HttpClient) {}

  getEspacios(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.url).pipe(
      tap(data => { if (data) this.espaciosList = data; }),
      catchError(() => of(this.espaciosList))
    );
  }

  crearEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.post<Espacio>(`${this.url}/crear`, espacio).pipe(
      tap(newEsp => {
        newEsp.id = this.espaciosList.length + 1;
        this.espaciosList.push(newEsp);
      }),
      catchError(() => {
        espacio.id = this.espaciosList.length + 1;
        this.espaciosList.push(espacio);
        return of(espacio);
      })
    );
  }

  actualizarEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.url}/actualizar`, espacio).pipe(
      tap(upEsp => {
        const idx = this.espaciosList.findIndex(e => e.id === upEsp.id);
        if (idx !== -1) this.espaciosList[idx] = upEsp;
      }),
      catchError(() => {
        const idx = this.espaciosList.findIndex(e => e.id === espacio.id);
        if (idx !== -1) this.espaciosList[idx] = espacio;
        return of(espacio);
      })
    );
  }

  eliminarEspacio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.espaciosList = this.espaciosList.filter(e => e.id !== id);
      }),
      catchError(() => {
        this.espaciosList = this.espaciosList.filter(e => e.id !== id);
        return of(undefined);
      })
    );
  }
}
