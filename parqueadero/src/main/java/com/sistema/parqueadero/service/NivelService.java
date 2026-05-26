package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Nivel;
import com.sistema.parqueadero.repository.NivelRepository;
import java.util.List;

@Service
public class NivelService {

    @Autowired
    private NivelRepository nivelRepository;

    public List<Nivel> getNiveles() {
        return nivelRepository.findAll();
    }

    public Nivel getNivel(int id) {
        return nivelRepository.findById(id).orElse(null);
    }

    public Nivel crearNivel(Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    public Nivel actualizarNivel(Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    public void eliminarNivel(int id) {
        nivelRepository.deleteById(id);
    }
}
