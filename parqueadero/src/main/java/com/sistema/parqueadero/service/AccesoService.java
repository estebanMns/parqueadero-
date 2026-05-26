package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Acceso;
import com.sistema.parqueadero.repository.AccesoRepository;
import java.util.List;

@Service
public class AccesoService {

    @Autowired
    private AccesoRepository accesoRepository;

    public List<Acceso> getAccesos() {
        return accesoRepository.findAll();
    }

    public Acceso getAcceso(Long id) {
        return accesoRepository.findById(id).orElse(null);
    }

    public Acceso crearAcceso(Acceso acceso) {
        return accesoRepository.save(acceso);
    }

    public Acceso actualizarAcceso(Acceso acceso) {
        return accesoRepository.save(acceso);
    }

    public void eliminarAcceso(Long id) {
        accesoRepository.deleteById(id);
    }
}
