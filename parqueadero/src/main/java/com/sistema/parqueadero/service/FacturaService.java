package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Factura;
import com.sistema.parqueadero.repository.FacturaRepository;
import java.util.List;

@Service
public class FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;

    public List<Factura> getFacturas() {
        return facturaRepository.findAll();
    }

    public Factura getFactura(Long id) {
        return facturaRepository.findById(id).orElse(null);
    }

    public Factura crearFactura(Factura factura) {
        return facturaRepository.save(factura);
    }

    public Factura actualizarFactura(Factura factura) {
        return facturaRepository.save(factura);
    }

    public void eliminarFactura(Long id) {
        facturaRepository.deleteById(id);
    }

    public Factura calcularFactura(Factura factura) {
        return facturaRepository.save(factura);
    }
}
