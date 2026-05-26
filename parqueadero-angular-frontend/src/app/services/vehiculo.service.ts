import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  private readonly url = `${environment.apiUrl}/vehiculos`;

  // Local state for fallback
  private vehiculosList: Vehiculo[] = [
    { color: 'Gris', placa: 'AUO-311', tipoVehiculo: 'CARRO' },
    { color: 'Rojo', placa: 'MTR-992', tipoVehiculo: 'MOTO' }
  ];

  constructor(private readonly http: HttpClient) {}

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.url).pipe(
      tap(data => { if (data) this.vehiculosList = data; }),
      catchError(() => of(this.vehiculosList))
    );
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.url}/${id}`).pipe(
      catchError(() => {
        const found = this.vehiculosList[id] || this.vehiculosList[0];
        return of(found);
      })
    );
  }

  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.url}/crear_vehiculo`, vehiculo).pipe(
      tap(newVeh => {
        if (!this.vehiculosList.some(v => v.placa === newVeh.placa)) {
          this.vehiculosList.push(newVeh);
        }
      }),
      catchError(() => {
        if (!this.vehiculosList.some(v => v.placa === vehiculo.placa)) {
          this.vehiculosList.push(vehiculo);
        }
        return of(vehiculo);
      })
    );
  }

  actualizarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.url}/actualizar_vehiculo`, vehiculo).pipe(
      tap(upVeh => {
        const idx = this.vehiculosList.findIndex(v => v.placa === upVeh.placa);
        if (idx !== -1) this.vehiculosList[idx] = upVeh;
      }),
      catchError(() => {
        const idx = this.vehiculosList.findIndex(v => v.placa === vehiculo.placa);
        if (idx !== -1) this.vehiculosList[idx] = vehiculo;
        return of(vehiculo);
      })
    );
  }

  eliminarVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar_vehiculo/${id}`).pipe(
      tap(() => {
        this.vehiculosList.splice(id, 1);
      }),
      catchError(() => {
        this.vehiculosList.splice(id, 1);
        return of(undefined);
      })
    );
  }
}
