package com.sistema.parqueadero.models;

public class Tarjeta extends Pago {

    public Tarjeta(int id, String metodoPago, double total, String estado) {
        super(id, metodoPago, total, estado);
    }

}
