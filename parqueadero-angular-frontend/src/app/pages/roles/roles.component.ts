import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🔑 Roles</h1>
          <p class="page-sub">Control de roles y permisos del sistema</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Rol' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">{{ editMode ? 'Editar Rol' : 'Crear Rol' }}</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Rol</label>
              <input class="form-input" [(ngModel)]="form.tipoRol" name="tipoRol" placeholder="ADMIN / OPERADOR" required>
            </div>
            <div class="form-group">
              <label>Permiso</label>
              <input class="form-input" [(ngModel)]="form.permiso" name="permiso" placeholder="READ / WRITE / ALL" required>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editMode ? '💾 Actualizar' : '✅ Guardar' }}</button>
            <button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando roles...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>

      <!-- Role Cards -->
      <div class="roles-grid" *ngIf="!loading">
        <div class="role-card" *ngFor="let r of roles; let i = index">
          <div class="role-icon">🔑</div>
          <div class="role-body">
            <span class="role-name">{{ r.tipoRol }}</span>
            <span class="role-permiso">{{ r.permiso }}</span>
          </div>
          <div class="role-actions">
            <button class="btn-edit" (click)="editar(r)">✏️</button>
            <button class="btn-del"  (click)="eliminar(r.id!)">🗑️</button>
          </div>
        </div>
        <div *ngIf="roles.length === 0" style="grid-column:1/-1;text-align:center;color:#475569;padding:32px">
          No hay roles registrados
        </div>
      </div>
    </div>
  `,
  styles: [`
    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .role-card {
      background: rgba(30,41,59,0.75); border: 1px solid rgba(159,122,234,0.15);
      border-radius: 16px; padding: 20px;
      display: flex; align-items: center; gap: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .role-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.3); }
    .role-icon {
      font-size: 1.8rem; width: 50px; height: 50px;
      background: linear-gradient(135deg,rgba(159,122,234,0.2),rgba(99,179,237,0.15));
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
    }
    .role-body { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .role-name { color: #e2e8f0; font-weight: 700; font-size: 0.95rem; }
    .role-permiso { color: #9f7aea; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .role-actions { display: flex; flex-direction: column; gap: 6px; }
    .btn-edit, .btn-del { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 6px; border-radius: 6px; transition: background 0.15s; }
    .btn-edit:hover { background: rgba(99,179,237,0.12); }
    .btn-del:hover  { background: rgba(252,129,129,0.12); }
  `],
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  loading = false; error = ''; showForm = false; editMode = false;
  form: Rol = { tipoRol: '', permiso: '' };

  constructor(private readonly rolService: RolService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.rolService.getRoles().subscribe({
      next: (d) => { this.roles = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar roles'; this.loading = false; }
    });
  }
  guardar(): void {
    const obs = this.editMode ? this.rolService.actualizarRol(this.form) : this.rolService.crearRol(this.form);
    obs.subscribe({ next: () => { this.cargar(); this.cancelar(); } });
  }
  editar(r: Rol): void { this.form = { ...r }; this.editMode = true; this.showForm = true; }
  eliminar(id: number): void {
    if (confirm('¿Eliminar rol?')) this.rolService.eliminarRol(id).subscribe({ next: () => this.cargar() });
  }
  cancelar(): void { this.showForm = false; this.editMode = false; this.form = { tipoRol: '', permiso: '' }; }
}
