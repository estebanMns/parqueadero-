package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Acceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String puerta;
    private String horaEntrada;
    private String horaSalida;
    private String calle;

    public Acceso() {}

    public Acceso(String puerta, String horaEntrada, String horaSalida, String calle) {
        this.puerta = puerta;
        this.horaEntrada = horaEntrada;
        this.horaSalida = horaSalida;
        this.calle = calle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPuerta() {
        return puerta;
    }

    public void setPuerta(String puerta) {
        this.puerta = puerta;
    }

    public String getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(String horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public String getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

}
