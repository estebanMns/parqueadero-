package com.sistema.parqueadero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Espacio;

@Repository
public interface EspacioRepository extends JpaRepository<Espacio, Integer> {
}
