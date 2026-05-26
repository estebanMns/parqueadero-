import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NivelService } from '../../services/nivel.service';
import { Nivel } from '../../models/nivel.model';

@Component({
  selector: 'app-niveles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🏢 Niveles</h1>
          <p class="page-sub">Gestión de pisos del parqueadero</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Nivel' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">Registrar Nivel</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Piso</label>
              <input class="form-input" [(ngModel)]="form.piso" name="piso" placeholder="Nivel 1" required>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select class="form-input" [(ngModel)]="form.estado" name="estado">
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label>Capacidad</label>
              <input class="form-input" type="number" [(ngModel)]="form.cantidad" name="cantidad" placeholder="40" required>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">✅ Guardar</button>
            <button type="button" class="btn-secondary" (click)="showForm = false">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando niveles...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>

      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Piso</th><th>Estado</th><th>Capacidad</th><th>Espacios</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let n of niveles; let i = index">
              <td class="id-cell">{{ (i+1).toString().padStart(3,'0') }}</td>
              <td><strong style="color:#e2e8f0">{{ n.piso }}</strong></td>
              <td><span [class]="n.estado === 'ACTIVO' ? 'badge-success' : 'badge-danger'">{{ n.estado }}</span></td>
              <td>{{ n.cantidad }}</td>
              <td>{{ n.estacionamientos.length || 0 }} registrados</td>
              <td class="action-cell">
                <button class="btn-edit" (click)="editar(n)">✏️</button>
                <button class="btn-del"  (click)="eliminar(n.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="niveles.length === 0">
              <td colspan="6" class="empty-row">No hay niveles registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class NivelesComponent implements OnInit {
  niveles: Nivel[] = [];
  loading = false; error = ''; showForm = false; editMode = false;
  form: Nivel = { piso: '', estado: 'ACTIVO', cantidad: 40, estacionamientos: [] };

  constructor(private readonly nivelService: NivelService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.nivelService.getNiveles().subscribe({
      next: (d) => { this.niveles = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar niveles'; this.loading = false; }
    });
  }
  guardar(): void {
    const obs = this.editMode ? this.nivelService.actualizarNivel(this.form) : this.nivelService.crearNivel(this.form);
    obs.subscribe({ next: () => { this.cargar(); this.cancelar(); } });
  }
  editar(n: Nivel): void { this.form = { ...n }; this.editMode = true; this.showForm = true; }
  eliminar(id: number): void {
    if (confirm('¿Eliminar nivel?')) this.nivelService.eliminarNivel(id).subscribe({ next: () => this.cargar() });
  }
  cancelar(): void { this.showForm = false; this.editMode = false; this.form = { piso: '', estado: 'ACTIVO', cantidad: 40, estacionamientos: [] }; }
}
