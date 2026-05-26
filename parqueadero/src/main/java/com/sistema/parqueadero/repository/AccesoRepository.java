package com.sistema.parqueadero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Acceso;

@Repository
public interface AccesoRepository extends JpaRepository<Acceso, Long> {
}
