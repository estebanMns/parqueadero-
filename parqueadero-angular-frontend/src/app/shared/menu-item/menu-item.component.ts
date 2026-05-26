import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';

/**
 * OOP — Recursividad:
 * MenuItemComponent se renderiza a sí mismo para sus hijos,
 * permitiendo árboles de menú de profundidad ilimitada.
 *
 * SRP: Este componente tiene UNA sola responsabilidad:
 * renderizar un nodo del árbol de menú y sus hijos.
 */
@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuItemComponent],
  template: `
    <li class="menu-node">
      <!-- Nodo hoja (ruta directa) -->
      <a *ngIf="!item.children || item.children.length === 0"
         [routerLink]="item.route"
         routerLinkActive="active"
         class="menu-link leaf">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
      </a>

      <!-- Nodo padre (tiene hijos → recursión) -->
      <button *ngIf="item.children && item.children.length > 0"
              class="menu-link parent"
              (click)="toggle()">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
        <span class="chevron" [class.rotated]="expanded">▸</span>
      </button>

      <!-- Sub-árbol recursivo -->
      <ul *ngIf="item.children && item.children.length > 0"
          class="submenu"
          [class.open]="expanded">
        <!-- RECURSIÓN: cada hijo vuelve a renderizar app-menu-item -->
        <app-menu-item
          *ngFor="let child of item.children"
          [item]="child"
          [depth]="depth + 1">
        </app-menu-item>
      </ul>
    </li>
  `,
  styles: [`
    .menu-node { list-style: none; }

    .menu-link {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 16px;
      border: none;
      background: transparent;
      color: #cbd5e1;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s, color 0.2s, transform 0.15s;
      text-align: left;
    }

    .menu-link:hover {
      background: rgba(99, 179, 237, 0.12);
      color: #90cdf4;
      transform: translateX(3px);
    }

    .menu-link.active {
      background: linear-gradient(90deg, rgba(99,179,237,0.25), rgba(159,122,234,0.15));
      color: #90cdf4;
      border-left: 3px solid #63b3ed;
    }

    .menu-icon { font-size: 1.1rem; min-width: 22px; }
    .menu-label { flex: 1; }

    .chevron {
      font-size: 0.75rem;
      transition: transform 0.3s ease;
      display: inline-block;
    }
    .chevron.rotated { transform: rotate(90deg); }

    .submenu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
      padding-left: 16px;
      list-style: none;
    }
    .submenu.open { max-height: 600px; }
  `]
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Input() depth = 0;

  expanded = false;

  /** Alterna la visibilidad del submenú hijo */
  toggle(): void {
    this.expanded = !this.expanded;
  }
}
