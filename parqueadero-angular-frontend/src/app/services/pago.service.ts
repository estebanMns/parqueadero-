import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Pago } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private readonly url = `${environment.apiUrl}/pagos`;

  private pagosList: Pago[] = [
    { id: 1, metodoPago: 'EFECTIVO', total: 6000, estado: 'COMPLETADO' },
    { id: 2, metodoPago: 'TARJETA', total: 12000, estado: 'COMPLETADO' }
  ];

  constructor(private readonly http: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.url).pipe(
      tap(data => { if (data) this.pagosList = data; }),
      catchError(() => of(this.pagosList))
    );
  }

  crearPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}/crear`, pago).pipe(
      tap(newPago => {
        newPago.id = this.pagosList.length + 1;
        this.pagosList.push(newPago);
      }),
      catchError(() => {
        pago.id = this.pagosList.length + 1;
        this.pagosList.push(pago);
        return of(pago);
      })
    );
  }

  actualizarPago(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.url}/actualizar`, pago).pipe(
      tap(upPago => {
        const idx = this.pagosList.findIndex(p => p.id === upPago.id);
        if (idx !== -1) this.pagosList[idx] = upPago;
      }),
      catchError(() => {
        const idx = this.pagosList.findIndex(p => p.id === pago.id);
        if (idx !== -1) this.pagosList[idx] = pago;
        return of(pago);
      })
    );
  }

  eliminarPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.pagosList = this.pagosList.filter(p => p.id !== id);
      }),
      catchError(() => {
        this.pagosList = this.pagosList.filter(p => p.id !== id);
        return of(undefined);
      })
    );
  }
}
