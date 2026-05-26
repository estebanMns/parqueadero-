package com.sistema.parqueadero.models;

public class Transferencia extends Pago {

    public Transferencia(int id, String metodoPago, double total, String estado) {
        super(id, metodoPago, total, estado);
    }

}
