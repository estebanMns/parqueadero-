import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly url = `${environment.apiUrl}/ticktet`;

  constructor(private readonly http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.url}/${id}`);
  }

  crearTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.url}/crearTicktet`, ticket);
  }

  actualizarTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.url}/actualizarTicket`, ticket);
  }

  eliminarTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminarTicket/${id}`);
  }
}
