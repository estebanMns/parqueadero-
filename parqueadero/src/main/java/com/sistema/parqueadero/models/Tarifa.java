package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tarifa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String tarifaCarro;
    private String tarifaMoto;

    public Tarifa() {}

    public Tarifa(String tarifaCarro, String tarifaMoto) {
        this.tarifaCarro = tarifaCarro;
        this.tarifaMoto = tarifaMoto;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTarifaCarro() {
        return tarifaCarro;
    }

    public void setTarifaCarro(String tarifaCarro) {
        this.tarifaCarro = tarifaCarro;
    }

    public String getTarifaMoto() {
        return tarifaMoto;
    }

    public void setTarifaMoto(String tarifaMoto) {
        this.tarifaMoto = tarifaMoto;
    }

}
