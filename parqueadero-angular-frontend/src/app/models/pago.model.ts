// OOP Abstraction: Interfaz que abstrae la entidad Pago del backend Java
// Aplica polimorfismo: el metodoPago puede ser Efectivo, Tarjeta o Transferencia
export interface Pago {
  id?: number;
  metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';
  total: number;
  estado: 'PENDIENTE' | 'COMPLETADO' | 'RECHAZADO';
}
