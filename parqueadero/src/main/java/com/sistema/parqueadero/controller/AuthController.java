package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Auth;
import com.sistema.parqueadero.service.AuthService;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("")
    public List<Auth> getAuths() {
        return authService.getAuths();
    }

    @GetMapping("/{id}")
    public Auth getAuth(@PathVariable int id) {
        return authService.getAuth(id);
    }

    @PostMapping("/crear_auth")
    public Auth crearAuth(@RequestBody Auth auth) {
        return authService.crearAuth(auth);
    }

    @DeleteMapping("/eliminar_auth/{id}")
    public void eliminarAuth(@PathVariable int id) {
        authService.eliminarAuth(id);
    }
}
