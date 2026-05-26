import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

/**
 * SRP: MenuService tiene UNA sola responsabilidad:
 * construir y proveer el árbol de menú de la aplicación.
 *
 * OOP — Recursividad: La estructura MenuItem[] permite
 * anidar children de forma ilimitada (árbol n-ario).
 */
@Injectable({ providedIn: 'root' })
export class MenuService {

  /** Árbol recursivo del menú lateral del parqueadero */
  getMenuItems(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        icon: '🏠',
        route: '/dashboard'
      },
      {
        label: 'Vehículos',
        icon: '🚗',
        children: [
          { label: 'Todos los Vehículos', icon: '🚘', route: '/vehiculos' },
          { label: 'Carros',              icon: '🚙', route: '/vehiculos/carros' },
          { label: 'Motos',               icon: '🏍️', route: '/vehiculos/motos' }
        ]
      },
      {
        label: 'Tickets',
        icon: '🎫',
        children: [
          { label: 'Ver Tickets',   icon: '📋', route: '/tickets' },
          { label: 'Nuevo Ticket',  icon: '➕', route: '/tickets/nuevo' }
        ]
      },
      {
        label: 'Espacios',
        icon: '🅿️',
        children: [
          { label: 'Disponibilidad', icon: '🟢', route: '/espacios' },
          {
            label: 'Niveles',
            icon: '🏢',
            children: [
              { label: 'Ver Niveles',   icon: '📐', route: '/niveles' },
              { label: 'Nuevo Nivel',   icon: '➕', route: '/niveles/nuevo' }
            ]
          }
        ]
      },
      {
        label: 'Pagos',
        icon: '💰',
        children: [
          { label: 'Todos los Pagos', icon: '📑', route: '/pagos' },
          { label: 'Efectivo',        icon: '💵', route: '/pagos/efectivo' },
          { label: 'Tarjeta',         icon: '💳', route: '/pagos/tarjeta' },
          { label: 'Transferencia',   icon: '🔄', route: '/pagos/transferencia' }
        ]
      },
      {
        label: 'Facturas',
        icon: '🧾',
        route: '/facturas'
      },
      {
        label: 'Usuarios',
        icon: '👤',
        children: [
          { label: 'Ver Usuarios',  icon: '👥', route: '/usuarios' },
          { label: 'Nuevo Usuario', icon: '➕', route: '/usuarios/nuevo' },
          {
            label: 'Roles',
            icon: '🔑',
            children: [
              { label: 'Ver Roles',  icon: '📋', route: '/roles' },
              { label: 'Nuevo Rol', icon: '➕', route: '/roles/nuevo' }
            ]
          }
        ]
      },
      {
        label: 'Configuración',
        icon: '⚙️',
        children: [
          { label: 'Tarifas', icon: '💲', route: '/tarifas' }
        ]
      }
    ];
  }
}
