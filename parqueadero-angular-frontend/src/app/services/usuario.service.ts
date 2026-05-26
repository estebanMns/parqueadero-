import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly url = `${environment.apiUrl}/usuarios`;

  private usuariosList: Usuario[] = [
    { id: 1, nombre: 'Esteban Meneses', correo: 'esteban@parqueadero.com', roles: [{ tipoRol: 'ADMINISTRADOR', permiso: 'TODO' }] },
    { id: 2, nombre: 'Juan Perez', correo: 'juan@parqueadero.com', roles: [{ tipoRol: 'OPERARIO', permiso: 'LEER_ESCRIBIR' }] }
  ];

  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url).pipe(
      tap(data => { if (data) this.usuariosList = data; }),
      catchError(() => of(this.usuariosList))
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(
      catchError(() => {
        const found = this.usuariosList.find(u => u.id === id) || this.usuariosList[0];
        return of(found);
      })
    );
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/crear`, usuario).pipe(
      tap(newUsuario => {
        newUsuario.id = this.usuariosList.length + 1;
        this.usuariosList.push(newUsuario);
      }),
      catchError(() => {
        usuario.id = this.usuariosList.length + 1;
        this.usuariosList.push(usuario);
        return of(usuario);
      })
    );
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/actualizar`, usuario).pipe(
      tap(upUsuario => {
        const idx = this.usuariosList.findIndex(u => u.id === upUsuario.id);
        if (idx !== -1) this.usuariosList[idx] = upUsuario;
      }),
      catchError(() => {
        const idx = this.usuariosList.findIndex(u => u.id === usuario.id);
        if (idx !== -1) this.usuariosList[idx] = usuario;
        return of(usuario);
      })
    );
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`).pipe(
      tap(() => {
        this.usuariosList = this.usuariosList.filter(u => u.id !== id);
      }),
      catchError(() => {
        this.usuariosList = this.usuariosList.filter(u => u.id !== id);
        return of(undefined);
      })
    );
  }
}
