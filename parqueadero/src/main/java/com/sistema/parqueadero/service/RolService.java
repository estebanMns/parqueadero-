package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Rol;
import com.sistema.parqueadero.repository.RolRepository;
import java.util.List;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public List<Rol> getRoles() {
        return rolRepository.findAll();
    }

    public Rol getRol(String id) {
        return rolRepository.findById(id).orElse(null);
    }

    public Rol crearRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public Rol actualizarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public void eliminarRol(String id) {
        rolRepository.deleteById(id);
    }
}
