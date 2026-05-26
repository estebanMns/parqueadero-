// OOP Abstraction: Interfaz que abstrae la entidad Espacio del backend Java
export interface Espacio {
  id?: number;
  nivel: string;
  numero: number;
  estado: boolean; // true = disponible, false = ocupado
}
