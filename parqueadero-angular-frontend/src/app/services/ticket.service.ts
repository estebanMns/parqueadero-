import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly url = `${environment.apiUrl}/ticktet`;

  private ticketsList: Ticket[] = [
    {
      id: 1,
      horaEntrada: new Date(Date.now() - 3600000).toISOString(),
      estado: 'ACTIVO',
      vehiculo: { color: 'Gris', placa: 'AUO-311', tipoVehiculo: 'CARRO' },
      espacio: 12,
      nivel: 'Nivel 1 — Sótano',
      tarifa: { tarifaCarro: 3000, tarifaMoto: 2000 }
    },
    {
      id: 2,
      horaEntrada: new Date(Date.now() - 7200000).toISOString(),
      estado: 'ACTIVO',
      vehiculo: { color: 'Rojo', placa: 'MTR-992', tipoVehiculo: 'MOTO' },
      espacio: 5,
      nivel: 'Nivel 2 — Planta',
      tarifa: { tarifaCarro: 3000, tarifaMoto: 2000 }
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url).pipe(
      tap(data => { if (data) this.ticketsList = data; }),
      catchError(() => of(this.ticketsList))
    );
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.url}/${id}`).pipe(
      catchError(() => {
        const found = this.ticketsList.find(t => t.id === id) || this.ticketsList[0];
        return of(found);
      })
    );
  }

  crearTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.url}/crearTicktet`, ticket).pipe(
      tap(newTicket => {
        newTicket.id = this.ticketsList.length + 1;
        this.ticketsList.push(newTicket);
      }),
      catchError(() => {
        ticket.id = this.ticketsList.length + 1;
        this.ticketsList.push(ticket);
        return of(ticket);
      })
    );
  }

  actualizarTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.url}/actualizarTicket`, ticket).pipe(
      tap(upTicket => {
        const idx = this.ticketsList.findIndex(t => t.id === upTicket.id);
        if (idx !== -1) this.ticketsList[idx] = upTicket;
      }),
      catchError(() => {
        const idx = this.ticketsList.findIndex(t => t.id === ticket.id);
        if (idx !== -1) this.ticketsList[idx] = ticket;
        return of(ticket);
      })
    );
  }

  eliminarTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminarTicket/${id}`).pipe(
      tap(() => {
        this.ticketsList = this.ticketsList.filter(t => t.id !== id);
      }),
      catchError(() => {
        this.ticketsList = this.ticketsList.filter(t => t.id !== id);
        return of(undefined);
      })
    );
  }
}
