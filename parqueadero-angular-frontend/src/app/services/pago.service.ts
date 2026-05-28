import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private readonly url = `${environment.apiUrl}/pagos`;

  constructor(private readonly http: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.url);
  }

  crearPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}/crear`, pago);
  }

  actualizarPago(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.url}/actualizar`, pago);
  }

  eliminarPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`);
  }
}
