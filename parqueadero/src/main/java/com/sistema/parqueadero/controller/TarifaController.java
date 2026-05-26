package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Tarifa;
import com.sistema.parqueadero.service.TarifaService;
import java.util.List;

@RestController
@RequestMapping("/api/tarifas")
public class TarifaController {

    @Autowired
    private TarifaService tarifaService;

    @GetMapping("")
    public List<Tarifa> getTarifas() {
        return tarifaService.getTarifas();
    }

    @GetMapping("/{id}")
    public Tarifa getTarifa(@PathVariable int id) {
        return tarifaService.getTarifa(id);
    }

    @PostMapping("/crear")
    public Tarifa crearTarifa(@RequestBody Tarifa tarifa) {
        return tarifaService.crearTarifa(tarifa);
    }

    @PutMapping("/actualizar")
    public Tarifa actualizarTarifa(@RequestBody Tarifa tarifa) {
        return tarifaService.actualizarTarifa(tarifa);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarTarifa(@PathVariable int id) {
        tarifaService.eliminarTarifa(id);
    }
}
