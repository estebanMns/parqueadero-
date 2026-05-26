package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Pago;
import com.sistema.parqueadero.service.PagoService;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @GetMapping("")
    public List<Pago> getPagos() {
        return pagoService.getPagos();
    }

    @GetMapping("/{id}")
    public Pago obtenerPago(@PathVariable int id) {
        return pagoService.obtenerPago(id);
    }

    @PostMapping("/crear")
    public Pago crearPago(@RequestBody Pago pago) {
        return pagoService.crearPago(pago);
    }

    @PutMapping("/actualizar")
    public Pago actualizarPago(@RequestBody Pago pago) {
        return pagoService.actualizarPago(pago);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarPago(@PathVariable int id) {
        pagoService.eliminarPago(id);
    }
}
