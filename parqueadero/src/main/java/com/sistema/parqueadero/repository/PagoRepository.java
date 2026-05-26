package com.sistema.parqueadero.repository;

import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Pago;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Integer> {

}
