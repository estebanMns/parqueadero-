package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Espacio;
import com.sistema.parqueadero.repository.EspacioRepository;
import java.util.List;

@Service
public class EspacioService {

    @Autowired
    private EspacioRepository espacioRepository;

    public List<Espacio> getEspacios() {
        return espacioRepository.findAll();
    }

    public Espacio getEspacio(int id) {
        return espacioRepository.findById(id).orElse(null);
    }

    public Espacio crearEspacio(Espacio espacio) {
        return espacioRepository.save(espacio);
    }

    public Espacio actualizarEspacio(Espacio espacio) {
        return espacioRepository.save(espacio);
    }

    public void eliminarEspacio(int id) {
        espacioRepository.deleteById(id);
    }
}
