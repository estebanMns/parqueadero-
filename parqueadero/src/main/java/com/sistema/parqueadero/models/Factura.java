package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date fechaSalida;
    private LocalDateTime horaSalida;
    private double total;
    private String tarifa;
    private String tipoVehiculo;
    private String nivel;
    private String espacio;
    private String tipoPago;
    private String iva;

    public Factura() {}

    public Factura(int id, Date fechaSalida, LocalDateTime horaSalida, double total, String tarifa, String tipoVehiculo,
            String nivel, String espacio, String tipoPago, String iva) {
        this.id = id;
        this.fechaSalida = fechaSalida;
        this.horaSalida = horaSalida;
        this.total = total;
        this.tarifa = tarifa;
        this.tipoVehiculo = tipoVehiculo;
        this.nivel = nivel;
        this.espacio = espacio;
        this.tipoPago = tipoPago;
        this.iva = iva;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public LocalDateTime getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(LocalDateTime horaSalida) {
        this.horaSalida = horaSalida;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getTarifa() {
        return tarifa;
    }

    public void setTarifa(String tarifa) {
        this.tarifa = tarifa;
    }

    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getEspacio() {
        return espacio;
    }

    public void setEspacio(String espacio) {
        this.espacio = espacio;
    }

    public String getTipoPago() {
        return tipoPago;
    }

    public void setTipoPago(String tipoPago) {
        this.tipoPago = tipoPago;
    }

    public String getIva() {
        return iva;
    }

    public void setIva(String iva) {
        this.iva = iva;
    }

}
