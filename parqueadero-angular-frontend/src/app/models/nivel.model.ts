import { Espacio } from './espacio.model';

// OOP Abstraction: Interfaz que abstrae la entidad Nivel del backend Java
// Nivel contiene lista de Espacios → Composición OOP
export interface Nivel {
  id?: number;
  piso: string;
  estado: string;
  cantidad: number;
  estacionamientos: Espacio[];
}
