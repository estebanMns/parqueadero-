package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import java.util.List;

@Entity
public class Nivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String piso;

    @Transient
    private List<Espacio> estacionamientos;

    private String estado;
    private int cantidad;

    public Nivel() {}

    public Nivel(String piso, List<Espacio> estacionamientos, String estado, int cantidad) {
        this.piso = piso;
        this.estacionamientos = estacionamientos;
        this.estado = estado;
        this.cantidad = cantidad;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPiso() {
        return piso;
    }

    public void setPiso(String piso) {
        this.piso = piso;
    }

    public List<Espacio> getEstacionamientos() {
        return estacionamientos;
    }

    public void setEstacionamientos(List<Espacio> estacionamientos) {
        this.estacionamientos = estacionamientos;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

}
