package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Reporte {

    @Id
    private String id = UUID.randomUUID().toString();

    private String espaciosOcupados;
    private double montoDia;
    private Date fecha;
    private String tipoVehiculo;
    private LocalDateTime horaReporte;
    private String usuarios;

    public Reporte() {}

    public Reporte(String espaciosOcupados, double montoDia, String tipoVehiculo, LocalDateTime horaReporte,
            String usuarios, Date fecha) {
        this.espaciosOcupados = espaciosOcupados;
        this.montoDia = montoDia;
        this.tipoVehiculo = tipoVehiculo;
        this.horaReporte = horaReporte;
        this.usuarios = usuarios;
        this.fecha = fecha;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEspaciosOcupados() {
        return espaciosOcupados;
    }

    public void setEspaciosOcupados(String espaciosOcupados) {
        this.espaciosOcupados = espaciosOcupados;
    }

    public double getMontoDia() {
        return montoDia;
    }

    public void setMontoDia(double montoDia) {
        this.montoDia = montoDia;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public LocalDateTime getHoraReporte() {
        return horaReporte;
    }

    public void setHoraReporte(LocalDateTime horaReporte) {
        this.horaReporte = horaReporte;
    }

    public String getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(String usuarios) {
        this.usuarios = usuarios;
    }

}
