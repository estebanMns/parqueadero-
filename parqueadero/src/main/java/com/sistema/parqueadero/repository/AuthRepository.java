package com.sistema.parqueadero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sistema.parqueadero.models.Auth;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Integer> {
}
