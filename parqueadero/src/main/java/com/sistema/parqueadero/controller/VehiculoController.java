package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Vehiculo;
import com.sistema.parqueadero.service.VehiculoService;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping("")
    public List<Vehiculo> getVehiculos() {
        return vehiculoService.getVehiculos();
    }

    @GetMapping("/{id}")
    public Vehiculo getVehiculo(@PathVariable int id) {
        return vehiculoService.getVehiculo(id);
    }

    @PostMapping("/crear_vehiculo")
    public Vehiculo crearVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.crearVehiculo(vehiculo);
    }

    @PutMapping("/actualizar_vehiculo")
    public Vehiculo actualizarVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.actualizarVehiculo(vehiculo);
    }

    @DeleteMapping("/eliminar_vehiculo/{id}")
    public void eliminarVehiculo(@PathVariable int id) {
        vehiculoService.eliminarVehiculo(id);
    }
}
