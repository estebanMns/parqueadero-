package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Usuario;
import com.sistema.parqueadero.repository.UsuarioRepository;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuario(int id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(int id) {
        usuarioRepository.deleteById(id);
    }
}
