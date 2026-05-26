package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Auth;
import com.sistema.parqueadero.repository.AuthRepository;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public List<Auth> getAuths() {
        return authRepository.findAll();
    }

    public Auth getAuth(int id) {
        return authRepository.findById(id).orElse(null);
    }

    public Auth crearAuth(Auth auth) {
        return authRepository.save(auth);
    }

    public void eliminarAuth(int id) {
        authRepository.deleteById(id);
    }
}
