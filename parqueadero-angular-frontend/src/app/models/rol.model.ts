// OOP Abstraction: Interfaz que abstrae la entidad Rol del backend Java
export interface Rol {
  id?: number;
  tipoRol: string;
  permiso: string;
}
