import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura.model';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <h1 class="page-title">🧾 Facturas</h1>
          <p class="page-sub">Historial de facturas emitidas</p>
        </div>
      </header>

      <div *ngIf="loading" class="state-msg">⟳ Cargando facturas...</div>
      <div *ngIf="error"   class="error-msg">⚠️ {{ error }}</div>

      <div class="table-card" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha Salida</th>
              <th>Vehículo</th>
              <th>Nivel / Espacio</th>
              <th>Tarifa</th>
              <th>IVA</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let f of facturas; let i = index">
              <td class="id-cell">{{ (i+1).toString().padStart(3,'0') }}</td>
              <td>{{ f.fechaSalida }}</td>
              <td>
                <span class="type-badge" [class.carro]="f.tipoVehiculo === 'CARRO'">
                  {{ f.tipoVehiculo === 'CARRO' ? '🚗' : '🏍️' }} {{ f.tipoVehiculo }}
                </span>
              </td>
              <td>{{ f.nivel }} / {{ f.espacio }}</td>
              <td>{{ f.tarifa }}</td>
              <td>{{ f.iva }}</td>
              <td style="color:#68d391;font-weight:700">{{ f.total | currency:'COP':'symbol':'1.0-0' }}</td>
              <td>
                <span class="placa-badge" style="font-size:0.78rem">{{ f.tipoPago }}</span>
              </td>
              <td class="action-cell">
                <button class="btn-edit" title="Imprimir">🖨️</button>
                <button class="btn-del" (click)="eliminar(f.id!)">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="facturas.length === 0">
              <td colspan="9" class="empty-row">No hay facturas emitidas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['../../shared/styles/page.shared.css']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] = [];
  loading = false; error = '';

  constructor(private readonly facturaService: FacturaService) {}
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.loading = true;
    this.facturaService.getFacturas().subscribe({
      next: (d) => { this.facturas = d; this.loading = false; },
      error: () => { this.error = 'Error al cargar facturas'; this.loading = false; }
    });
  }
  eliminar(id: number): void {
    if (confirm('¿Eliminar factura?')) this.facturaService.eliminarFactura(id).subscribe({ next: () => this.cargar() });
  }
}
