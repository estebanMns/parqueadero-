import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../models/espacio.model';

/** SRP: EspaciosComponent gestiona exclusivamente la vista de Espacios. */
@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🅿️ Espacios</h1>
          <p class="page-sub">Disponibilidad de espacios de estacionamiento</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Espacio' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">Registrar Espacio</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Número</label>
              <input class="form-input" type="number" [(ngModel)]="form.numero" name="numero" placeholder="1" required>
            </div>
            <div class="form-group">
              <label>Nivel</label>
              <select class="form-input" [(ngModel)]="form.nivel" name="nivel">
                <option value="Nivel 1">Nivel 1</option>
                <option value="Nivel 2">Nivel 2</option>
                <option value="Nivel 3">Nivel 3</option>
              </select>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select class="form-input" [(ngModel)]="form.estado" name="estado">
                <option [value]="true">🟢 Disponible</option>
                <option [value]="false">🔴 Ocupado</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">✅ Guardar</button>
            <button type="button" class="btn-secondary" (click)="showForm = false">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Grilla visual de espacios -->
      <div class="espacios-grid" *ngIf="!loading">
        <div *ngFor="let e of espacios"
             class="espacio-cell"
             [class.libre]="e.estado"
             [class.ocupado]="!e.estado">
          <span class="espacio-num">{{ e.numero }}</span>
          <span class="espacio-nivel">{{ e.nivel }}</span>
          <span class="espacio-icon">{{ e.estado ? '🟢' : '🔴' }}</span>
          <div class="espacio-actions">
            <button class="btn-edit" (click)="toggleEstado(e)">🔄</button>
            <button class="btn-del"  (click)="eliminar(e.id!)">🗑️</button>
          </div>
        </div>
        <div *ngIf="espacios.length === 0" class="empty-row" style="grid-column:1/-1;text-align:center;color:#475569;padding:32px">
          No hay espacios registrados
        </div>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando espacios...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>
    </div>
  `,
  styles: [`
    .espacios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }
    .espacio-cell {
      background: rgba(30,41,59,0.7);
      border-radius: 14px;
      padding: 16px 12px;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      border: 2px solid transparent;
      transition: transform 0.2s, border-color 0.2s;
      cursor: default;
    }
    .espacio-cell:hover { transform: scale(1.05); }
    .espacio-cell.libre   { border-color: rgba(104,211,145,0.35); background: rgba(104,211,145,0.06); }
    .espacio-cell.ocupado { border-color: rgba(252,129,129,0.35); background: rgba(252,129,129,0.06); }
    .espacio-num  { font-size: 1.3rem; font-weight: 800; color: #e2e8f0; }
    .espacio-nivel{ font-size: 0.65rem; color: #64748b; text-align: center; }
    .espacio-icon { font-size: 1rem; }
    .espacio-actions { display: flex; gap: 4px; margin-top: 4px; }
  `, `@import '../../shared/styles/page.shared.css';`],
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class EspaciosComponent implements OnInit {
  espacios: Espacio[] = [];
  loading = false; error = ''; showForm = false;
  form: Espacio = { numero: 1, nivel: 'Nivel 1', estado: true };

  constructor(private readonly espacioService: EspacioService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.espacioService.getEspacios().subscribe({
      next: (d) => { this.espacios = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar espacios'; this.loading = false; }
    });
  }
  guardar(): void {
    this.espacioService.crearEspacio(this.form).subscribe({ next: () => { this.cargar(); this.showForm = false; } });
  }
  toggleEstado(e: Espacio): void {
    const updated = { ...e, estado: !e.estado };
    this.espacioService.actualizarEspacio(updated).subscribe({ next: () => this.cargar() });
  }
  eliminar(id: number): void {
    if (confirm('¿Eliminar espacio?')) {
      this.espacioService.eliminarEspacio(id).subscribe({ next: () => this.cargar() });
    }
  }
}
