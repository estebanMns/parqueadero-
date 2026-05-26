package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Rol;
import com.sistema.parqueadero.service.RolService;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping("")
    public List<Rol> getRoles() {
        return rolService.getRoles();
    }

    @GetMapping("/{id}")
    public Rol getRol(@PathVariable String id) {
        return rolService.getRol(id);
    }

    @PostMapping("/crearRol")
    public Rol crearRol(@RequestBody Rol rol) {
        return rolService.crearRol(rol);
    }

    @PutMapping("/actualizarRol")
    public Rol actualizarRol(@RequestBody Rol rol) {
        return rolService.actualizarRol(rol);
    }

    @DeleteMapping("/eliminarRol/{id}")
    public void eliminarRol(@PathVariable String id) {
        rolService.eliminarRol(id);
    }
}
