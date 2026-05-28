package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Auth;
import com.sistema.parqueadero.service.AuthService;
import com.sistema.parqueadero.service.UsuarioService;
import com.sistema.parqueadero.models.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.obtenerPorCorreo(request.getCorreo());
        if (usuario != null && request.getContrasena() != null && request.getContrasena().equals(usuario.getContrasena())) {
            // Success: Return structured tokens
            LoginResponse response = new LoginResponse(
                "token-premium-sesion-" + usuario.getId(),
                "refresh-token-premium-" + usuario.getId()
            );
            return ResponseEntity.ok(response);
        } else {
            // Failure: Return 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

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

    // DTO Classes representing transfer data for Auth
    public static class LoginRequest {
        private String correo;
        private String contrasena;

        public LoginRequest() {}
        public LoginRequest(String correo, String contrasena) {
            this.correo = correo;
            this.contrasena = contrasena;
        }

        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getContrasena() { return contrasena; }
        public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    }

    public static class LoginResponse {
        private String token;
        private String refreshToken;

        public LoginResponse() {}
        public LoginResponse(String token, String refreshToken) {
            this.token = token;
            this.refreshToken = refreshToken;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getRefreshToken() { return refreshToken; }
        public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    }
}
