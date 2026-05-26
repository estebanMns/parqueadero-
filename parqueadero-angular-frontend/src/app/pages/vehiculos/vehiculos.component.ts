import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo.model';

/** SRP: VehiculosComponent gestiona exclusivamente la vista CRUD de Vehículos. */
@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🚗 Vehículos</h1>
          <p class="page-sub">Gestión del registro de vehículos</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Vehículo' }}
        </button>
      </header>

      <!-- Formulario -->
      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">{{ editMode ? 'Editar Vehículo' : 'Registrar Vehículo' }}</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Placa</label>
              <input class="form-input" [(ngModel)]="form.placa" name="placa" placeholder="ABC-123" required>
            </div>
            <div class="form-group">
              <label>Color</label>
              <input class="form-input" [(ngModel)]="form.color" name="color" placeholder="Rojo" required>
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <select class="form-input" [(ngModel)]="form.tipoVehiculo" name="tipo">
                <option value="CARRO">🚗 Carro</option>
                <option value="MOTO">🏍️ Moto</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? '💾 Actualizar' : '✅ Guardar' }}
            </button>
            <button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Estado de carga / error -->
      <div *ngIf="loading" class="state-msg">⟳ Cargando vehículos...</div>
      <div *ngIf="error" class="error-msg">⚠️ {{ error }}</div>

      <!-- Tabla -->
      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Placa</th>
              <th>Color</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of vehiculos; let i = index">
              <td class="id-cell">{{ (i + 1).toString().padStart(3,'0') }}</td>
              <td><span class="placa-badge">{{ v.placa }}</span></td>
              <td>{{ v.color }}</td>
              <td>
                <span class="type-badge" [class.carro]="v.tipoVehiculo === 'CARRO'">
                  {{ v.tipoVehiculo === 'CARRO' ? '🚗 Carro' : '🏍️ Moto' }}
                </span>
              </td>
              <td class="action-cell">
                <button class="btn-edit" (click)="editar(v)">✏️</button>
                <button class="btn-del"  (click)="eliminar(v.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="vehiculos.length === 0">
              <td colspan="5" class="empty-row">No hay vehículos registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading = false;
  error = '';
  showForm = false;
  editMode = false;
  form: Vehiculo = { color: '', placa: '', tipoVehiculo: 'CARRO' };

  constructor(private readonly vehiculoService: VehiculoService) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.loading = true;
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => { this.vehiculos = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar vehículos'; this.loading = false; }
    });
  }

  guardar(): void {
    if (this.editMode) {
      this.vehiculoService.actualizarVehiculo(this.form).subscribe({ next: () => { this.cargar(); this.cancelar(); }});
    } else {
      this.vehiculoService.crearVehiculo(this.form).subscribe({ next: () => { this.cargar(); this.cancelar(); }});
    }
  }

  editar(v: Vehiculo): void { this.form = { ...v }; this.editMode = true; this.showForm = true; }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(id).subscribe({ next: () => this.cargar() });
    }
  }

  cancelar(): void { this.showForm = false; this.editMode = false; this.form = { color: '', placa: '', tipoVehiculo: 'CARRO' }; }
}
