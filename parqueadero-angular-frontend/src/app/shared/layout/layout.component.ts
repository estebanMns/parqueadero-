import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * SRP: LayoutComponent tiene UNA sola responsabilidad:
 * ensamblar el shell de la aplicación: sidebar + área de contenido.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      min-height: 100vh;
      background: #0f172a;
    }

    .main-content {
      margin-left: 260px;
      flex: 1;
      padding: 32px;
      overflow-x: hidden;
    }
  `]
})
export class LayoutComponent {}
