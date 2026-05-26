import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menu-item.model';

/**
 * SRP: SidebarComponent tiene UNA sola responsabilidad:
 * mostrar el menú lateral de navegación usando el árbol recursivo.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuItemComponent],
  template: `
    <aside class="sidebar">
      <!-- Logo / Branding -->
      <div class="sidebar-brand">
        <div class="brand-icon">🅿️</div>
        <div class="brand-text">
          <span class="brand-name">ParkSystem</span>
          <span class="brand-sub">Gestión de Parqueadero</span>
        </div>
      </div>

      <!-- Línea divisora -->
      <div class="sidebar-divider"></div>

      <!-- Árbol de menú recursivo -->
      <nav class="sidebar-nav">
        <ul class="menu-root">
          <!-- Recursividad: MenuItemComponent renderiza sus propios hijos -->
          <app-menu-item
            *ngFor="let item of menuItems"
            [item]="item"
            [depth]="0">
          </app-menu-item>
        </ul>
      </nav>

      <!-- Footer del sidebar -->
      <div class="sidebar-footer">
        <div class="sidebar-divider"></div>
        <button class="logout-btn" (click)="logout()">
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      min-height: 100vh;
      background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(99, 179, 237, 0.1);
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0; left: 0; bottom: 0;
      z-index: 100;
      overflow-y: auto;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 20px;
    }

    .brand-icon {
      font-size: 2rem;
      background: linear-gradient(135deg, #63b3ed, #9f7aea);
      border-radius: 12px;
      width: 48px; height: 48px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(99, 179, 237, 0.3);
    }

    .brand-text {
      display: flex; flex-direction: column;
    }

    .brand-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: #e2e8f0;
      letter-spacing: 0.5px;
    }

    .brand-sub {
      font-size: 0.68rem;
      color: #64748b;
      letter-spacing: 0.3px;
    }

    .sidebar-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99,179,237,0.2), transparent);
      margin: 4px 16px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 12px 10px;
    }

    .menu-root {
      list-style: none;
      padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 2px;
    }

    .sidebar-footer {
      padding: 8px 10px 16px;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 16px;
      border: none;
      background: transparent;
      color: #fc8181;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.2s, transform 0.15s;
      text-align: left;
      margin-top: 8px;
    }

    .logout-btn:hover {
      background: rgba(252, 129, 129, 0.12);
      transform: translateX(3px);
    }
  `]
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private readonly menuService: MenuService) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
}
