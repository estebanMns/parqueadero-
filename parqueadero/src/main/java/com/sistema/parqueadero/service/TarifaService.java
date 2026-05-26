package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Tarifa;
import com.sistema.parqueadero.repository.TarifaRepository;
import java.util.List;

@Service
public class TarifaService {

    @Autowired
    private TarifaRepository tarifaRepository;

    public List<Tarifa> getTarifas() {
        return tarifaRepository.findAll();
    }

    public Tarifa getTarifa(int id) {
        return tarifaRepository.findById(id).orElse(null);
    }

    public Tarifa crearTarifa(Tarifa tarifa) {
        return tarifaRepository.save(tarifa);
    }

    public Tarifa actualizarTarifa(Tarifa tarifa) {
        return tarifaRepository.save(tarifa);
    }

    public void eliminarTarifa(int id) {
        tarifaRepository.deleteById(id);
    }
}
