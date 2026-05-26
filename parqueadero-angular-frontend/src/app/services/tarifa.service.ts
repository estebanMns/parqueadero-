import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tarifa } from '../models/tarifa.model';

@Injectable({ providedIn: 'root' })
export class TarifaService {
  private readonly url = `${environment.apiUrl}/tarifas`;

  private tarifasList: Tarifa[] = [
    { id: 1, tarifaCarro: 3000, tarifaMoto: 2000 }
  ];

  constructor(private readonly http: HttpClient) {}

  getTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.url).pipe(
      tap(data => { if (data) this.tarifasList = data; }),
      catchError(() => of(this.tarifasList))
    );
  }

  crearTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(`${this.url}/crear`, tarifa).pipe(
      tap(newTarifa => {
        newTarifa.id = this.tarifasList.length + 1;
        this.tarifasList.push(newTarifa);
      }),
      catchError(() => {
        tarifa.id = this.tarifasList.length + 1;
        this.tarifasList.push(tarifa);
        return of(tarifa);
      })
    );
  }

  actualizarTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.url}/actualizar`, tarifa).pipe(
      tap(upTarifa => {
        const idx = this.tarifasList.findIndex(t => t.id === upTarifa.id);
        if (idx !== -1) this.tarifasList[idx] = upTarifa;
      }),
      catchError(() => {
        const idx = this.tarifasList.findIndex(t => t.id === tarifa.id);
        if (idx !== -1) this.tarifasList[idx] = tarifa;
        return of(tarifa);
      })
    );
  }

  eliminarTarifa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.tarifasList = this.tarifasList.filter(t => t.id !== id);
      }),
      catchError(() => {
        this.tarifasList = this.tarifasList.filter(t => t.id !== id);
        return of(undefined);
      })
    );
  }
}
