// OOP Abstraction: Interfaz que abstrae la entidad Vehiculo del backend Java
// Aplica herencia polimórfica: Carro y Moto extienden Vehiculo
export interface Vehiculo {
  id?: number;
  color: string;
  placa: string;
  tipoVehiculo: 'CARRO' | 'MOTO';
}

export interface Carro extends Vehiculo {
  tipoVehiculo: 'CARRO';
}

export interface Moto extends Vehiculo {
  tipoVehiculo: 'MOTO';
}
