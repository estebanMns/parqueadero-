import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { VehiculoService } from '../../services/vehiculo.service';
import { TicketService } from '../../services/ticket.service';
import { NivelService } from '../../services/nivel.service';
import { PagoService } from '../../services/pago.service';
import { FacturaService } from '../../services/factura.service';

/**
 * SRP: DashboardComponent tiene UNA sola responsabilidad:
 * mostrar el panel de resumen/estadísticas del parqueadero de manera dinámica.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <header class="page-header">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-sub">Resumen del sistema de parqueadero</p>
      </header>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        ⟳ Calculando métricas del sistema...
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid" *ngIf="!loading">
        <div class="kpi-card" *ngFor="let kpi of kpis">
          <div class="kpi-icon" [style.background]="kpi.gradient">{{ kpi.icon }}</div>
          <div class="kpi-info">
            <span class="kpi-value">{{ kpi.value }}</span>
            <span class="kpi-label">{{ kpi.label }}</span>
          </div>
          <div class="kpi-badge" [style.color]="kpi.color">{{ kpi.trend }}</div>
        </div>
      </div>

      <!-- Accesos rápidos -->
      <section class="quick-section">
        <h2 class="section-title">Acciones Rápidas</h2>
        <div class="quick-grid">
          <a *ngFor="let action of quickActions"
             [routerLink]="action.route"
             class="quick-card">
             <span class="quick-icon">{{ action.icon }}</span>
             <span class="quick-label">{{ action.label }}</span>
             <span class="quick-arrow">→</span>
          </a>
        </div>
      </section>

      <!-- Estado de espacios por nivel -->
      <section class="levels-section" *ngIf="!loading">
        <h2 class="section-title">Estado por Nivel</h2>
        <div class="levels-grid">
          <div class="level-card" *ngFor="let lvl of levels">
            <div class="level-header">
              <span class="level-name">{{ lvl.piso }}</span>
              <span class="level-badge" [class.full]="lvl.libres === 0">
                {{ lvl.libres > 0 ? 'Disponible' : 'Lleno' }}
              </span>
            </div>
            <div class="level-bar-bg">
              <div class="level-bar-fill"
                   [style.width.%]="lvl.total > 0 ? (lvl.ocupados / lvl.total) * 100 : 0"
                   [class.bar-warn]="lvl.total > 0 && (lvl.ocupados / lvl.total) > 0.8">
              </div>
            </div>
            <div class="level-stats">
              <span>🟢 {{ lvl.libres }} libres</span>
              <span>🔴 {{ lvl.ocupados }} ocupados</span>
              <span>📊 {{ lvl.total }} total</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1200px; }

    .page-header { margin-bottom: 32px; }
    .page-title {
      font-size: 2rem; font-weight: 800;
      background: linear-gradient(135deg, #63b3ed, #9f7aea);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin: 0 0 6px;
    }
    .page-sub { color: #64748b; margin: 0; }

    .loading-state {
      padding: 40px;
      text-align: center;
      color: #63b3ed;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .kpi-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(99, 179, 237, 0.1);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      backdrop-filter: blur(12px);
    }
    .kpi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.3);
    }

    .kpi-icon {
      width: 52px; height: 52px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem;
    }

    .kpi-info { flex: 1; display: flex; flex-direction: column; }
    .kpi-value { font-size: 1.8rem; font-weight: 800; color: #e2e8f0; line-height: 1; }
    .kpi-label { font-size: 0.78rem; color: #64748b; margin-top: 4px; }
    .kpi-badge { font-size: 0.8rem; font-weight: 600; }

    .section-title {
      font-size: 1.1rem; font-weight: 700;
      color: #94a3b8; margin: 0 0 16px;
      text-transform: uppercase; letter-spacing: 1px;
    }

    .quick-section { margin-bottom: 40px; }
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 14px;
    }

    .quick-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(99, 179, 237, 0.1);
      border-radius: 14px;
      padding: 18px;
      display: flex; flex-direction: column; gap: 10px;
      text-decoration: none;
      transition: transform 0.2s, border-color 0.2s, background 0.2s;
      cursor: pointer;
    }
    .quick-card:hover {
      transform: translateY(-3px);
      border-color: rgba(99, 179, 237, 0.35);
      background: rgba(30, 41, 59, 0.9);
    }

    .quick-icon { font-size: 1.8rem; }
    .quick-label { color: #cbd5e1; font-size: 0.9rem; font-weight: 500; flex: 1; }
    .quick-arrow { color: #63b3ed; font-size: 1.1rem; align-self: flex-end; }

    .levels-section {}
    .levels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }

    .level-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(99, 179, 237, 0.1);
      border-radius: 14px;
      padding: 20px;
    }

    .level-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 14px;
    }

    .level-name { color: #e2e8f0; font-weight: 700; font-size: 1rem; }

    .level-badge {
      background: rgba(104, 211, 145, 0.15);
      color: #68d391;
      border: 1px solid rgba(104, 211, 145, 0.3);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .level-badge.full {
      background: rgba(252, 129, 129, 0.15);
      color: #fc8181;
      border-color: rgba(252, 129, 129, 0.3);
    }

    .level-bar-bg {
      height: 8px; background: rgba(255,255,255,0.06);
      border-radius: 4px; overflow: hidden; margin-bottom: 12px;
    }
    .level-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #63b3ed, #9f7aea);
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .level-bar-fill.bar-warn {
      background: linear-gradient(90deg, #f6ad55, #fc8181);
    }

    .level-stats {
      display: flex; gap: 12px;
      font-size: 0.78rem; color: #64748b;
    }
  `]
})
export class DashboardComponent implements OnInit {
  loading = true;

  kpis: any[] = [];
  levels: any[] = [];

  quickActions = [
    { icon: '🎫', label: 'Nuevo Ticket',   route: '/tickets' },
    { icon: '🚗', label: 'Nuevo Vehículo', route: '/vehiculos' },
    { icon: '💰', label: 'Registrar Pago', route: '/pagos' },
    { icon: '🧾', label: 'Ver Facturas',   route: '/facturas' },
    { icon: '👤', label: 'Nuevo Usuario',  route: '/usuarios' },
    { icon: '⚙️', label: 'Tarifas',        route: '/tarifas' },
  ];

  constructor(
    private readonly vehiculoService: VehiculoService,
    private readonly ticketService: TicketService,
    private readonly nivelService: NivelService,
    private readonly pagoService: PagoService,
    private readonly facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    forkJoin({
      vehiculos: this.vehiculoService.getVehiculos(),
      tickets: this.ticketService.getTickets(),
      niveles: this.nivelService.getNiveles(),
      pagos: this.pagoService.getPagos(),
      facturas: this.facturaService.getFacturas()
    }).subscribe({
      next: ({ vehiculos, tickets, niveles, pagos, facturas }) => {
        const totalNiveles = niveles.length;
        const totalEspacios = niveles.reduce((sum, n) => sum + n.cantidad, 0) || 120;
        const ticketsActivos = tickets.filter(t => t.estado === 'ACTIVO');
        const countTicketsActivos = ticketsActivos.length;
        const espaciosLibres = Math.max(0, totalEspacios - countTicketsActivos);

        const totalIngresos = pagos.reduce((sum, p) => sum + p.total, 0);
        const formatIngresos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalIngresos);

        // Populate KPIs dynamically
        this.kpis = [
          { icon: '🅿️', label: 'Espacios Totales',    value: totalEspacios.toString(), trend: '+0%',  color: '#63b3ed', gradient: 'linear-gradient(135deg,#63b3ed22,#63b3ed44)' },
          { icon: '🟢', label: 'Espacios Libres',      value: espaciosLibres.toString(),  trend: totalEspacios > 0 ? `${Math.round((espaciosLibres / totalEspacios) * 100)}%` : '0%',  color: '#68d391', gradient: 'linear-gradient(135deg,#68d39122,#68d39144)' },
          { icon: '🎫', label: 'Tickets Activos',       value: countTicketsActivos.toString(),  trend: 'en vivo', color: '#f6ad55', gradient: 'linear-gradient(135deg,#f6ad5522,#f6ad5544)' },
          { icon: '💰', label: 'Ingresos del Día',      value: formatIngresos, trend: 'total', color: '#9f7aea', gradient: 'linear-gradient(135deg,#9f7aea22,#9f7aea44)' },
          { icon: '🚗', label: 'Vehículos Registrados', value: vehiculos.length.toString(), trend: 'total', color: '#fc8181', gradient: 'linear-gradient(135deg,#fc818122,#fc818144)' },
          { icon: '🧾', label: 'Facturas Emitidas',     value: facturas.length.toString(),  trend: 'hoy',  color: '#76e4f7', gradient: 'linear-gradient(135deg,#76e4f722,#76e4f744)' },
        ];

        // Populate Levels dynamically
        this.levels = niveles.map(n => {
          const ocupados = ticketsActivos.filter(t => t.nivel?.toLowerCase().includes(n.piso.toLowerCase()) || n.piso.toLowerCase().includes(t.nivel?.toLowerCase())).length;
          const libres = Math.max(0, n.cantidad - ocupados);
          return {
            piso: n.piso,
            total: n.cantidad,
            ocupados: ocupados,
            libres: libres
          };
        });

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
