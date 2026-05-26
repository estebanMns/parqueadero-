package com.sistema.parqueadero.models;

public class Imprimir {

    private Ticket ticket;
    private Factura factura;
    private Reporte reporte;

    public Imprimir(Ticket ticket, Factura factura, Reporte reporte) {
        this.ticket = ticket;
        this.factura = factura;
        this.reporte = reporte;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public Reporte getReporte() {
        return reporte;
    }

    public void setReporte(Reporte reporte) {
        this.reporte = reporte;
    }

}
