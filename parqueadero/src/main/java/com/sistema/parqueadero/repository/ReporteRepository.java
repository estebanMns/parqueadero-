package com.sistema.parqueadero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Reporte;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, String> {
}
