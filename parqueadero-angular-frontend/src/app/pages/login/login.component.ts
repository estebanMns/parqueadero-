import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginRequest } from '../../models/auth.model';

/**
 * SRP: LoginComponent tiene UNA sola responsabilidad:
 * gestionar el formulario de autenticación y auto-registro del usuario.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="login-card">
        <!-- Logo -->
        <div class="login-brand">
          <div class="login-icon">🅿️</div>
          <h1 class="login-title">ParkSystem</h1>
          <p class="login-subtitle">Sistema de Gestión de Parqueadero</p>
        </div>

        <!-- Formulario de Iniciar Sesión -->
        <form *ngIf="!isRegisterMode" class="login-form" (ngSubmit)="onLogin()">
          <h2 class="form-title-text">Iniciar Sesión</h2>

          <div class="form-group">
            <label for="correo" class="form-label">Correo electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input
                id="correo"
                type="email"
                class="form-input"
                placeholder="admin@parqueadero.com"
                [(ngModel)]="credentials.correo"
                name="correo"
                required>
            </div>
          </div>

          <div class="form-group">
            <label for="contrasena" class="form-label">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                id="contrasena"
                [type]="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••"
                [(ngModel)]="credentials.contrasena"
                name="contrasena"
                required>
              <button type="button" class="toggle-pw" (click)="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <div *ngIf="errorMsg" class="error-alert">
            ⚠️ {{ errorMsg }}
          </div>

          <button type="submit" class="btn-login" [disabled]="loading">
            <span *ngIf="!loading">Ingresar al Sistema</span>
            <span *ngIf="loading" class="spinner">⟳</span>
          </button>

          <p class="toggle-mode">
            ¿No tienes cuenta? <button type="button" class="toggle-link" (click)="toggleMode(true)">Regístrate aquí</button>
          </p>
        </form>

        <!-- Formulario de Registro -->
        <form *ngIf="isRegisterMode" class="login-form" (ngSubmit)="onRegister()">
          <h2 class="form-title-text">Registrarse</h2>

          <div class="form-group">
            <label for="reg-nombre" class="form-label">Nombre completo</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input
                id="reg-nombre"
                type="text"
                class="form-input"
                placeholder="Juan Pérez"
                [(ngModel)]="registerData.nombre"
                name="nombre"
                required>
            </div>
          </div>

          <div class="form-group">
            <label for="reg-correo" class="form-label">Correo electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input
                id="reg-correo"
                type="email"
                class="form-input"
                placeholder="juan@email.com"
                [(ngModel)]="registerData.correo"
                name="correo"
                required>
            </div>
          </div>

          <div class="form-group">
            <label for="reg-contrasena" class="form-label">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                id="reg-contrasena"
                [type]="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••"
                [(ngModel)]="registerData.contrasena"
                name="contrasena"
                required>
              <button type="button" class="toggle-pw" (click)="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <div *ngIf="errorMsg" class="error-alert">
            ⚠️ {{ errorMsg }}
          </div>

          <div *ngIf="successMsg" class="success-alert">
            ✓ {{ successMsg }}
          </div>

          <button type="submit" class="btn-login" [disabled]="loading">
            <span *ngIf="!loading">Registrar Cuenta</span>
            <span *ngIf="loading" class="spinner">⟳</span>
          </button>

          <p class="toggle-mode">
            ¿Ya tienes una cuenta? <button type="button" class="toggle-link" (click)="toggleMode(false)">Inicia sesión</button>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f172a;
      position: relative;
      overflow: hidden;
    }

    .login-bg { position: absolute; inset: 0; pointer-events: none; }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }
    .orb-1 { width: 400px; height: 400px; background: #63b3ed; top: -100px; left: -100px; }
    .orb-2 { width: 300px; height: 300px; background: #9f7aea; bottom: -80px; right: -80px; }
    .orb-3 { width: 250px; height: 250px; background: #68d391; top: 50%; left: 50%; transform: translate(-50%,-50%); }

    .login-card {
      position: relative;
      z-index: 1;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 179, 237, 0.15);
      border-radius: 24px;
      padding: 48px 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }

    .login-brand {
      text-align: center;
      margin-bottom: 24px;
    }

    .login-icon {
      font-size: 3rem;
      background: linear-gradient(135deg, #63b3ed, #9f7aea);
      border-radius: 20px;
      width: 72px; height: 72px;
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 16px;
      box-shadow: 0 8px 24px rgba(99, 179, 237, 0.3);
    }

    .login-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: #e2e8f0;
      margin: 0 0 6px;
    }

    .login-subtitle {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0;
    }

    .login-form { display: flex; flex-direction: column; gap: 20px; }

    .form-title-text {
      font-size: 1.2rem;
      font-weight: 750;
      color: #f1f5f9;
      margin: 0 0 4px;
      text-align: center;
      letter-spacing: 0.5px;
    }

    .form-group { display: flex; flex-direction: column; gap: 8px; }

    .form-label {
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      font-size: 1rem;
      pointer-events: none;
    }

    .form-input {
      width: 100%;
      padding: 12px 44px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(99, 179, 237, 0.2);
      border-radius: 10px;
      color: #e2e8f0;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .form-input:focus {
      border-color: #63b3ed;
      box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.15);
    }

    .form-input::placeholder { color: #475569; }

    .toggle-pw {
      position: absolute; right: 12px;
      background: none; border: none;
      cursor: pointer; font-size: 1rem;
    }

    .error-alert {
      background: rgba(252, 129, 129, 0.1);
      border: 1px solid rgba(252, 129, 129, 0.3);
      color: #fc8181;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.85rem;
    }

    .success-alert {
      background: rgba(72, 187, 120, 0.1);
      border: 1px solid rgba(72, 187, 120, 0.3);
      color: #48bb78;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.85rem;
    }

    .btn-login {
      padding: 14px;
      background: linear-gradient(135deg, #63b3ed, #9f7aea);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(99, 179, 237, 0.35);
    }

    .btn-login:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(99, 179, 237, 0.45);
    }

    .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

    .toggle-mode {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 0;
      font-size: 0.9rem;
      color: #94a3b8;
    }

    .toggle-link {
      color: #63b3ed;
      cursor: pointer;
      text-decoration: underline;
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
      font-weight: 600;
    }

    .toggle-link:hover {
      color: #9f7aea;
    }

    .spinner {
      display: inline-block;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = { correo: '', contrasena: '' };
  registerData = { nombre: '', correo: '', contrasena: '' };
  
  isRegisterMode = false;
  loading = false;
  errorMsg = '';
  successMsg = '';
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  toggleMode(register: boolean): void {
    this.isRegisterMode = register;
    this.errorMsg = '';
    this.successMsg = '';
    this.showPassword = false;
    this.credentials = { correo: '', contrasena: '' };
    this.registerData = { nombre: '', correo: '', contrasena: '' };
  }

  onLogin(): void {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.authService.saveTokens(response);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMsg = 'Credenciales incorrectas. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  onRegister(): void {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.registerData.nombre || !this.registerData.correo || !this.registerData.contrasena) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      this.loading = false;
      return;
    }

    this.usuarioService.crearUsuario({
      nombre: this.registerData.nombre,
      correo: this.registerData.correo,
      contrasena: this.registerData.contrasena,
      roles: []
    }).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = '¡Registro exitoso! Redirigiendo al inicio de sesión...';
        this.registerData = { nombre: '', correo: '', contrasena: '' };
        setTimeout(() => {
          this.isRegisterMode = false;
          this.successMsg = '';
        }, 1500);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Error al registrar el usuario. Inténtalo de nuevo.';
      }
    });
  }
}
