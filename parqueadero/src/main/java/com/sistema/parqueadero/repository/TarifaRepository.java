package com.sistema.parqueadero.repository;

import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Tarifa;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TarifaRepository extends JpaRepository<Tarifa, Integer> {

}
