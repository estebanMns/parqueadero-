package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Usuario;
import com.sistema.parqueadero.service.UsuarioService;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("")
    public List<Usuario> getUsuarios() {
        return usuarioService.getUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario getUsuario(@PathVariable int id) {
        return usuarioService.getUsuario(id);
    }

    @PostMapping("/crear")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.crearUsuario(usuario);
    }

    @PutMapping("/actualizar")
    public Usuario actualizarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.actualizarUsuario(usuario);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminarUsuario(@PathVariable int id) {
        usuarioService.eliminarUsuario(id);
    }
}
