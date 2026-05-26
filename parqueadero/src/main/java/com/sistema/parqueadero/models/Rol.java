package com.sistema.parqueadero.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Rol {

    @Id
    private String tipoRol;
    private String permiso;

    public Rol() {}

    public Rol(String tipoRol, String permiso) {
        this.tipoRol = tipoRol;
        this.permiso = permiso;
    }

    public String getTipoRol() {
        return tipoRol;
    }

    public void setTipoRol(String tipoRol) {
        this.tipoRol = tipoRol;
    }

    public String getPermiso() {
        return permiso;
    }

    public void setPermiso(String permiso) {
        this.permiso = permiso;
    }

}
