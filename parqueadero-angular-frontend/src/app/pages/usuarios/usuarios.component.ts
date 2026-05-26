import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">👤 Usuarios</h1>
          <p class="page-sub">Gestión de usuarios del sistema</p>
        </div>
        <button class="btn-primary" (click)="showForm = !showForm">
          {{ showForm ? '✕ Cancelar' : '＋ Nuevo Usuario' }}
        </button>
      </header>

      <div class="form-card" *ngIf="showForm">
        <h2 class="form-title">{{ editMode ? 'Editar Usuario' : 'Registrar Usuario' }}</h2>
        <form (ngSubmit)="guardar()" class="entity-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre</label>
              <input class="form-input" [(ngModel)]="form.nombre" name="nombre" placeholder="Juan Pérez" required>
            </div>
            <div class="form-group">
              <label>Correo</label>
              <input class="form-input" type="email" [(ngModel)]="form.correo" name="correo" placeholder="juan@email.com" required>
            </div>
            <div class="form-group" *ngIf="!editMode">
              <label>Contraseña</label>
              <input class="form-input" type="password" [(ngModel)]="form.contrasena" name="contrasena" placeholder="••••••••" required>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editMode ? '💾 Actualizar' : '✅ Guardar' }}</button>
            <button type="button" class="btn-secondary" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="loading" class="state-msg">⟳ Cargando usuarios...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>

      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Avatar</th><th>Nombre</th><th>Correo</th><th>Roles</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of usuarios; let i = index">
              <td class="id-cell">{{ (i+1).toString().padStart(3,'0') }}</td>
              <td>
                <div class="avatar" [style.background]="getAvatarColor(u.nombre)">
                  {{ getInitials(u.nombre) }}
                </div>
              </td>
              <td style="color:#e2e8f0;font-weight:600">{{ u.nombre }}</td>
              <td style="color:#64748b">{{ u.correo }}</td>
              <td>
                <span *ngFor="let r of u.roles" class="role-tag">{{ r.tipoRol }}</span>
                <span *ngIf="!u.roles || u.roles.length === 0" style="color:#475569">Sin rol</span>
              </td>
              <td class="action-cell">
                <button class="btn-edit" (click)="editar(u)">✏️</button>
                <button class="btn-del"  (click)="eliminar(u.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="usuarios.length === 0">
              <td colspan="6" class="empty-row">No hay usuarios registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.85rem; color: white;
    }
    .role-tag {
      background: rgba(159,122,234,0.12); color: #9f7aea;
      border: 1px solid rgba(159,122,234,0.25);
      padding: 2px 8px; border-radius: 10px;
      font-size: 0.75rem; margin-right: 4px;
    }
  `],
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false; error = ''; showForm = false; editMode = false;
  form: Usuario = { nombre: '', correo: '', contrasena: '', roles: [] };

  private readonly avatarColors = ['#63b3ed','#9f7aea','#68d391','#f6ad55','#fc8181','#76e4f7'];

  constructor(private readonly usuarioService: UsuarioService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (d) => { this.usuarios = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar usuarios'; this.loading = false; }
    });
  }
  guardar(): void {
    const obs = this.editMode ? this.usuarioService.actualizarUsuario(this.form) : this.usuarioService.crearUsuario(this.form);
    obs.subscribe({ next: () => { this.cargar(); this.cancelar(); } });
  }
  editar(u: Usuario): void { this.form = { ...u }; this.editMode = true; this.showForm = true; }
  eliminar(id: number): void {
    if (confirm('¿Eliminar usuario?')) this.usuarioService.eliminarUsuario(id).subscribe({ next: () => this.cargar() });
  }
  cancelar(): void { this.showForm = false; this.editMode = false; this.form = { nombre: '', correo: '', roles: [] }; }
  getInitials(nombre: string): string { return nombre.split(' ').slice(0,2).map(w => w[0]?.toUpperCase()).join(''); }
  getAvatarColor(nombre: string): string { return this.avatarColors[nombre.charCodeAt(0) % this.avatarColors.length]; }
}
