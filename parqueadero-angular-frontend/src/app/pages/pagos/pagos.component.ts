import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/pago.model';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">💰 Pagos</h1>
          <p class="page-sub">Registro y gestión de pagos del parqueadero</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Registrar Pago' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">Registrar Pago</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Método de Pago</label>
              <select class="form-input" [(ngModel)]="form.metodoPago" name="metodo">
                <option value="EFECTIVO">💵 Efectivo</option>
                <option value="TARJETA">💳 Tarjeta</option>
                <option value="TRANSFERENCIA">🔄 Transferencia</option>
              </select>
            </div>
            <div class="form-group">
              <label>Total (COP)</label>
              <input class="form-input" type="number" [(ngModel)]="form.total" name="total" placeholder="15000" required>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select class="form-input" [(ngModel)]="form.estado" name="estado">
                <option value="COMPLETADO">✅ Completado</option>
                <option value="PENDIENTE">⏳ Pendiente</option>
                <option value="RECHAZADO">❌ Rechazado</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">✅ Guardar Pago</button>
            <button type="button" class="btn-secondary" (click)="showForm = false">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Resumen por método -->
      <div class="metodo-summary">
        <div class="metodo-card" *ngFor="let m of metodosSummary">
          <span class="metodo-icon">{{ m.icon }}</span>
          <div class="metodo-info">
            <span class="metodo-label">{{ m.label }}</span>
            <span class="metodo-count">{{ contarPorMetodo(m.key) }} pagos</span>
          </div>
          <span class="metodo-total">{{ totalPorMetodo(m.key) | currency:'COP':'symbol':'1.0-0' }}</span>
        </div>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando pagos...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>

      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Método</th><th>Total</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of pagos; let i = index">
              <td class="id-cell">{{ (i+1).toString().padStart(3,'0') }}</td>
              <td>
                <span class="metodo-tag">
                  {{ p.metodoPago === 'EFECTIVO' ? '💵' : p.metodoPago === 'TARJETA' ? '💳' : '🔄' }}
                  {{ p.metodoPago }}
                </span>
              </td>
              <td style="color:#68d391;font-weight:700">{{ p.total | currency:'COP':'symbol':'1.0-0' }}</td>
              <td>
                <span [class]="p.estado === 'COMPLETADO' ? 'badge-success' : p.estado === 'PENDIENTE' ? 'badge-warning' : 'badge-danger'">
                  {{ p.estado }}
                </span>
              </td>
              <td class="action-cell">
                <button class="btn-del" (click)="eliminar(p.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="pagos.length === 0">
              <td colspan="5" class="empty-row">No hay pagos registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .metodo-summary {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
      gap: 14px; margin-bottom: 24px;
    }
    .metodo-card {
      background: rgba(30,41,59,0.7); border: 1px solid rgba(99,179,237,0.1);
      border-radius: 14px; padding: 18px;
      display: flex; align-items: center; gap: 14px;
    }
    .metodo-icon { font-size: 1.6rem; }
    .metodo-info { flex: 1; display: flex; flex-direction: column; }
    .metodo-label { color: #94a3b8; font-size: 0.8rem; }
    .metodo-count { color: #e2e8f0; font-weight: 700; font-size: 1rem; }
    .metodo-total { color: #68d391; font-weight: 700; font-size: 0.95rem; }
    .metodo-tag { background: rgba(99,179,237,0.1); color: #63b3ed; padding: 3px 10px; border-radius: 6px; font-size: 0.83rem; }
  `],
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];
  loading = false; error = ''; showForm = false;
  form: Pago = { metodoPago: 'EFECTIVO', total: 0, estado: 'COMPLETADO' };

  metodosSummary = [
    { key: 'EFECTIVO',      icon: '💵', label: 'Efectivo' },
    { key: 'TARJETA',       icon: '💳', label: 'Tarjeta' },
    { key: 'TRANSFERENCIA', icon: '🔄', label: 'Transferencia' }
  ];

  constructor(private readonly pagoService: PagoService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.pagoService.getPagos().subscribe({
      next: (d) => { this.pagos = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar pagos'; this.loading = false; }
    });
  }
  guardar(): void {
    this.pagoService.crearPago(this.form).subscribe({ next: () => { this.cargar(); this.showForm = false; } });
  }
  eliminar(id: number): void {
    if (confirm('¿Eliminar pago?')) this.pagoService.eliminarPago(id).subscribe({ next: () => this.cargar() });
  }
  contarPorMetodo(metodo: string): number {
    return this.pagos.filter(p => p.metodoPago === metodo).length;
  }
  totalPorMetodo(metodo: string): number {
    return this.pagos.filter(p => p.metodoPago === metodo).reduce((s, p) => s + p.total, 0);
  }
}
