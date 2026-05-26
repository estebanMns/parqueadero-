import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Nivel } from '../models/nivel.model';

@Injectable({ providedIn: 'root' })
export class NivelService {
  private readonly url = `${environment.apiUrl}/niveles`;

  private nivelesList: Nivel[] = [
    { id: 1, piso: 'Nivel 1 — Sótano', cantidad: 40, estado: 'ACTIVO', estacionamientos: [] },
    { id: 2, piso: 'Nivel 2 — Planta', cantidad: 40, estado: 'ACTIVO', estacionamientos: [] },
    { id: 3, piso: 'Nivel 3 — Piso 1', cantidad: 40, estado: 'ACTIVO', estacionamientos: [] }
  ];

  constructor(private readonly http: HttpClient) {}

  getNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.url).pipe(
      tap(data => { if (data) this.nivelesList = data; }),
      catchError(() => of(this.nivelesList))
    );
  }

  crearNivel(nivel: Nivel): Observable<Nivel> {
    return this.http.post<Nivel>(`${this.url}/crear`, nivel).pipe(
      tap(newNivel => {
        newNivel.id = this.nivelesList.length + 1;
        this.nivelesList.push(newNivel);
      }),
      catchError(() => {
        nivel.id = this.nivelesList.length + 1;
        this.nivelesList.push(nivel);
        return of(nivel);
      })
    );
  }

  actualizarNivel(nivel: Nivel): Observable<Nivel> {
    return this.http.put<Nivel>(`${this.url}/actualizar`, nivel).pipe(
      tap(upNivel => {
        const idx = this.nivelesList.findIndex(n => n.id === upNivel.id);
        if (idx !== -1) this.nivelesList[idx] = upNivel;
      }),
      catchError(() => {
        const idx = this.nivelesList.findIndex(n => n.id === nivel.id);
        if (idx !== -1) this.nivelesList[idx] = nivel;
        return of(nivel);
      })
    );
  }

  eliminarNivel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.nivelesList = this.nivelesList.filter(n => n.id !== id);
      }),
      catchError(() => {
        this.nivelesList = this.nivelesList.filter(n => n.id !== id);
        return of(undefined);
      })
    );
  }
}
