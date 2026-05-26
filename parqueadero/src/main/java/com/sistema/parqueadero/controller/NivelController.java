package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Nivel;
import com.sistema.parqueadero.service.NivelService;
import java.util.List;

@RestController
@RequestMapping("/api/niveles")
public class NivelController {

    @Autowired
    private NivelService nivelService;

    @GetMapping("")
    public List<Nivel> getNiveles() {
        return nivelService.getNiveles();
    }

    @GetMapping("/{id}")
    public Nivel getNivel(@PathVariable int id) {
        return nivelService.getNivel(id);
    }

    @PostMapping("/crear")
    public Nivel crearNivel(@RequestBody Nivel nivel) {
        return nivelService.crearNivel(nivel);
    }

    @PutMapping("/actualizar")
    public Nivel actualizarNivel(@RequestBody Nivel nivel) {
        return nivelService.actualizarNivel(nivel);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarNivel(@PathVariable int id) {
        nivelService.eliminarNivel(id);
    }
}
