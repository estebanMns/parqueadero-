import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Factura } from '../models/factura.model';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private readonly url = `${environment.apiUrl}/facturas`;

  private facturasList: Factura[] = [
    {
      id: 1,
      fechaSalida: new Date().toISOString().split('T')[0],
      horaSalida: new Date().toISOString(),
      total: 6000,
      tarifa: 'CARRO',
      tipoVehiculo: 'CARRO',
      nivel: 'Nivel 1 — Sótano',
      espacio: '12',
      tipoPago: 'EFECTIVO',
      iva: '19%'
    },
    {
      id: 2,
      fechaSalida: new Date().toISOString().split('T')[0],
      horaSalida: new Date().toISOString(),
      total: 12000,
      tarifa: 'MOTO',
      tipoVehiculo: 'MOTO',
      nivel: 'Nivel 2 — Planta',
      espacio: '5',
      tipoPago: 'TARJETA',
      iva: '19%'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url).pipe(
      tap(data => { if (data) this.facturasList = data; }),
      catchError(() => of(this.facturasList))
    );
  }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.url}/${id}`).pipe(
      catchError(() => {
        const found = this.facturasList.find(f => f.id === id) || this.facturasList[0];
        return of(found);
      })
    );
  }

  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.url}/crear`, factura).pipe(
      tap(newFactura => {
        newFactura.id = this.facturasList.length + 1;
        this.facturasList.push(newFactura);
      }),
      catchError(() => {
        factura.id = this.facturasList.length + 1;
        this.facturasList.push(factura);
        return of(factura);
      })
    );
  }

  eliminarFactura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.facturasList = this.facturasList.filter(f => f.id !== id);
      }),
      catchError(() => {
        this.facturasList = this.facturasList.filter(f => f.id !== id);
        return of(undefined);
      })
    );
  }
}
