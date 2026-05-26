import { Vehiculo } from './vehiculo.model';
import { Tarifa } from './tarifa.model';

// OOP Abstraction: Interfaz que abstrae la entidad Ticket del backend Java
// Ticket compone Vehiculo y Tarifa → Composición OOP
export interface Ticket {
  id?: number;
  horaEntrada: string;
  horaSalida?: string;
  estado: 'ACTIVO' | 'CERRADO';
  vehiculo: Vehiculo;
  espacio: number;
  nivel: string;
  tarifa: Tarifa;
}
