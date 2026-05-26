// OOP Abstraction: Interfaz que abstrae la entidad Factura del backend Java
export interface Factura {
  id?: number;
  fechaSalida: string;
  horaSalida: string;
  total: number;
  tarifa: string;
  tipoVehiculo: string;
  nivel: string;
  espacio: string;
  tipoPago: string;
  iva: string;
}
