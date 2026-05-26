import { Rol } from './rol.model';

// OOP Abstraction: Interfaz que abstrae la entidad Usuario del backend Java
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contrasena?: string;
  roles: Rol[];
}
