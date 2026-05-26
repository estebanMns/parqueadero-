package com.sistema.parqueadero.repository;

import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Nivel;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface NivelRepository extends JpaRepository<Nivel, Integer> {

}
