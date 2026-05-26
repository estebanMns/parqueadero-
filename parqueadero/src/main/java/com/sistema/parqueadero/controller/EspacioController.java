package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Espacio;
import com.sistema.parqueadero.service.EspacioService;
import java.util.List;

@RestController
@RequestMapping("/api/espacios")
public class EspacioController {

    @Autowired
    private EspacioService espacioService;

    @GetMapping("")
    public List<Espacio> getEspacios() {
        return espacioService.getEspacios();
    }

    @GetMapping("/{id}")
    public Espacio getEspacio(@PathVariable int id) {
        return espacioService.getEspacio(id);
    }

    @PostMapping("/crear")
    public Espacio crearEspacio(@RequestBody Espacio espacio) {
        return espacioService.crearEspacio(espacio);
    }

    @PutMapping("/actualizar")
    public Espacio actualizarEspacio(@RequestBody Espacio espacio) {
        return espacioService.actualizarEspacio(espacio);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarEspacio(@PathVariable int id) {
        espacioService.eliminarEspacio(id);
    }
}
