import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { EspaciosComponent } from './pages/espacios/espacios.component';
import { NivelesComponent } from './pages/niveles/niveles.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';

export const routes: Routes = [
  // Ruta pública
  { path: 'login', component: LoginComponent },

  // Rutas privadas — protegidas por authGuard
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vehiculos', component: VehiculosComponent },
      { path: 'vehiculos/carros', component: VehiculosComponent },
      { path: 'vehiculos/motos',  component: VehiculosComponent },
      { path: 'tickets',          component: TicketsComponent },
      { path: 'tickets/nuevo',    component: TicketsComponent },
      { path: 'espacios',         component: EspaciosComponent },
      { path: 'niveles',          component: NivelesComponent },
      { path: 'niveles/nuevo',    component: NivelesComponent },
      { path: 'tarifas',          component: TarifasComponent },
      { path: 'pagos',            component: PagosComponent },
      { path: 'pagos/efectivo',       component: PagosComponent },
      { path: 'pagos/tarjeta',        component: PagosComponent },
      { path: 'pagos/transferencia',  component: PagosComponent },
      { path: 'facturas',         component: FacturasComponent },
      { path: 'usuarios',         component: UsuariosComponent },
      { path: 'usuarios/nuevo',   component: UsuariosComponent },
      { path: 'roles',            component: RolesComponent },
      { path: 'roles/nuevo',      component: RolesComponent },
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }
];
