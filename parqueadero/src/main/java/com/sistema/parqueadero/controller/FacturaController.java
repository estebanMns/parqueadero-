package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Factura;
import com.sistema.parqueadero.service.FacturaService;
import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping("")
    public List<Factura> getFacturas() {
        return facturaService.getFacturas();
    }

    @GetMapping("/{id}")
    public Factura getFactura(@PathVariable Long id) {
        return facturaService.getFactura(id);
    }

    @PostMapping("/crear")
    public Factura crearFactura(@RequestBody Factura factura) {
        return facturaService.crearFactura(factura);
    }

    @PutMapping("/actualizar")
    public Factura actualizarFactura(@RequestBody Factura factura) {
        return facturaService.actualizarFactura(factura);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarFactura(@PathVariable Long id) {
        facturaService.eliminarFactura(id);
    }
}
