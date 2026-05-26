package com.sistema.parqueadero.repository;

import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer> {

}
