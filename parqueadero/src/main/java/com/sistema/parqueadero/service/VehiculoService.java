package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Vehiculo;
import com.sistema.parqueadero.repository.VehiculoRepository;
import java.util.List;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> getVehiculos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo getVehiculo(int id) {
        return vehiculoRepository.findById(id).orElse(null);
    }

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public Vehiculo actualizarVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public void eliminarVehiculo(int id) {
        vehiculoRepository.deleteById(id);
    }
}
