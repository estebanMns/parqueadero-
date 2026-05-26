import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarifaService } from '../../services/tarifa.service';
import { Tarifa } from '../../models/tarifa.model';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">💲 Tarifas</h1>
          <p class="page-sub">Configuración de tarifas por tipo de vehículo</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nueva Tarifa' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">{{ editMode ? 'Editar Tarifa' : 'Registrar Tarifa' }}</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Tarifa Carro (COP/hora)</label>
              <input class="form-input" type="number" [(ngModel)]="form.tarifaCarro" name="tarifaCarro" placeholder="3000" required>
            </div>
            <div class="form-group">
              <label>Tarifa Moto (COP/hora)</label>
              <input class="form-input" type="number" [(ngModel)]="form.tarifaMoto" name="tarifaMoto" placeholder="2000" required>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editMode ? '💾 Actualizar' : '✅ Guardar' }}</button>
            <button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando tarifas...</div>
      <div *ngIf="error" class="error-msg">⚠️ {{ error }}</div>

      <!-- Tariff cards -->
      <div class="tariff-grid" *ngIf="!loading">
        <div class="tariff-card" *ngFor="let t of tarifas; let i = index">
          <div class="tariff-header">
            <span class="tariff-id">Tarifa #{{ (i+1).toString().padStart(2,'0') }}</span>
          </div>
          <div class="tariff-row">
            <span class="tariff-type">🚗 Carro</span>
            <span class="tariff-value">{{ t.tarifaCarro | currency:'COP':'symbol':'1.0-0' }}/hr</span>
          </div>
          <div class="tariff-row">
            <span class="tariff-type">🏍️ Moto</span>
            <span class="tariff-value">{{ t.tarifaMoto | currency:'COP':'symbol':'1.0-0' }}/hr</span>
          </div>
          <div class="tariff-actions">
            <button class="btn-edit" (click)="editar(t)">✏️ Editar</button>
            <button class="btn-del"  (click)="eliminar(t.id!)">🗑️</button>
          </div>
        </div>
        <div *ngIf="tarifas.length === 0" style="color:#475569;padding:32px;text-align:center;grid-column:1/-1">
          No hay tarifas configuradas
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tariff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }
    .tariff-card {
      background: rgba(30,41,59,0.75);
      border: 1px solid rgba(99,179,237,0.12);
      border-radius: 16px; padding: 22px;
      display: flex; flex-direction: column; gap: 14px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tariff-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
    .tariff-header { display: flex; justify-content: space-between; }
    .tariff-id { color: #64748b; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .tariff-row { display: flex; justify-content: space-between; align-items: center; }
    .tariff-type { color: #94a3b8; font-size: 0.9rem; }
    .tariff-value { color: #68d391; font-size: 1.1rem; font-weight: 700; }
    .tariff-actions { display: flex; gap: 10px; margin-top: 4px; }
    .btn-edit { background: rgba(99,179,237,0.1); border: 1px solid rgba(99,179,237,0.2); color: #63b3ed; border-radius: 8px; padding: 7px 14px; cursor: pointer; font-size: 0.83rem; transition: background 0.2s; }
    .btn-edit:hover { background: rgba(99,179,237,0.2); }
    .btn-del { background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 7px; border-radius: 8px; transition: background 0.15s; }
    .btn-del:hover { background: rgba(252,129,129,0.12); }
  `],
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class TarifasComponent implements OnInit {
  tarifas: Tarifa[] = [];
  loading = false; error = ''; showForm = false; editMode = false;
  form: Tarifa = { tarifaCarro: 3000, tarifaMoto: 2000 };

  constructor(private readonly tarifaService: TarifaService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.tarifaService.getTarifas().subscribe({
      next: (d) => { this.tarifas = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar tarifas'; this.loading = false; }
    });
  }
  guardar(): void {
    const obs = this.editMode ? this.tarifaService.actualizarTarifa(this.form) : this.tarifaService.crearTarifa(this.form);
    obs.subscribe({ next: () => { this.cargar(); this.cancelar(); } });
  }
  editar(t: Tarifa): void { this.form = { ...t }; this.editMode = true; this.showForm = true; }
  eliminar(id: number): void {
    if (confirm('¿Eliminar tarifa?')) this.tarifaService.eliminarTarifa(id).subscribe({ next: () => this.cargar() });
  }
  cancelar(): void { this.showForm = false; this.editMode = false; this.form = { tarifaCarro: 3000, tarifaMoto: 2000 }; }
}
