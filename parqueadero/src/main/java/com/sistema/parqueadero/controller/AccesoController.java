package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Acceso;
import com.sistema.parqueadero.service.AccesoService;
import java.util.List;

@RestController
@RequestMapping("/api/accesos")
public class AccesoController {

    @Autowired
    private AccesoService accesoService;

    @GetMapping("")
    public List<Acceso> getAccesos() {
        return accesoService.getAccesos();
    }

    @GetMapping("/{id}")
    public Acceso getAcceso(@PathVariable Long id) {
        return accesoService.getAcceso(id);
    }

    @PostMapping("/crear_acceso")
    public Acceso crearAcceso(@RequestBody Acceso acceso) {
        return accesoService.crearAcceso(acceso);
    }

    @PutMapping("/actualizar_acceso")
    public Acceso actualizarAcceso(@RequestBody Acceso acceso) {
        return accesoService.actualizarAcceso(acceso);
    }

    @DeleteMapping("/eliminar_acceso/{id}")
    public void eliminarAcceso(@PathVariable Long id) {
        accesoService.eliminarAcceso(id);
    }
}
