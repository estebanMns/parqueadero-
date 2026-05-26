package com.sistema.parqueadero.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sistema.parqueadero.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    
    
}
