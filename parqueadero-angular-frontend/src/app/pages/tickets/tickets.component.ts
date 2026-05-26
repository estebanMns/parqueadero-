import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

/** SRP: TicketsComponent gestiona exclusivamente la vista CRUD de Tickets. */
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🎫 Tickets</h1>
          <p class="page-sub">Control de entradas y salidas del parqueadero</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Ticket' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">Registrar Ticket</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Placa del Vehículo</label>
              <input class="form-input" [(ngModel)]="placaInput" name="placa" placeholder="ABC-123" required>
            </div>
            <div class="form-group">
              <label>Espacio #</label>
              <input class="form-input" type="number" [(ngModel)]="form.espacio" name="espacio" placeholder="12" required>
            </div>
            <div class="form-group">
              <label>Nivel</label>
              <select class="form-input" [(ngModel)]="form.nivel" name="nivel">
                <option value="Nivel 1">Nivel 1 — Sótano</option>
                <option value="Nivel 2">Nivel 2 — Planta</option>
                <option value="Nivel 3">Nivel 3 — Piso 1</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">✅ Abrir Ticket</button>
            <button type="button" class="btn-secondary" (click)="showForm = false">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando tickets...</div>
      <div *ngIf="error" class="error-msg">⚠️ {{ error }}</div>

      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehículo</th>
              <th>Espacio</th>
              <th>Nivel</th>
              <th>Hora Entrada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of tickets; let i = index">
              <td class="id-cell">{{ (i+1).toString().padStart(3,'0') }}</td>
              <td><span class="placa-badge">{{ t.vehiculo.placa || '—' }}</span></td>
              <td>{{ t.espacio }}</td>
              <td>{{ t.nivel }}</td>
              <td>{{ t.horaEntrada | date:'dd/MM/yy HH:mm' }}</td>
              <td>
                <span [class]="t.estado === 'ACTIVO' ? 'badge-success' : 'badge-danger'">
                  {{ t.estado }}
                </span>
              </td>
              <td class="action-cell">
                <button class="btn-edit" title="Cerrar ticket" (click)="cerrar(t)">🔒</button>
                <button class="btn-del" (click)="eliminar(t.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="tickets.length === 0">
              <td colspan="7" class="empty-row">No hay tickets registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = false; error = ''; showForm = false;
  placaInput = '';
  form: Partial<Ticket> = { espacio: 0, nivel: 'Nivel 1' };

  constructor(private readonly ticketService: TicketService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.loading = true;
    this.ticketService.getTickets().subscribe({
      next: (d) => { this.tickets = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar tickets'; this.loading = false; }
    });
  }

  guardar(): void {
    const ticket: Ticket = {
      horaEntrada: new Date().toISOString(), estado: 'ACTIVO',
      vehiculo: { color: '', placa: this.placaInput, tipoVehiculo: 'CARRO' },
      espacio: this.form.espacio!, nivel: this.form.nivel!,
      tarifa: { tarifaCarro: 3000, tarifaMoto: 2000 }
    };
    this.ticketService.crearTicket(ticket).subscribe({ next: () => { this.cargar(); this.showForm = false; } });
  }

  cerrar(t: Ticket): void {
    const updated = { ...t, estado: 'CERRADO' as const, horaSalida: new Date().toISOString() };
    this.ticketService.actualizarTicket(updated).subscribe({ next: () => this.cargar() });
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este ticket?')) {
      this.ticketService.eliminarTicket(id).subscribe({ next: () => this.cargar() });
    }
  }
}
