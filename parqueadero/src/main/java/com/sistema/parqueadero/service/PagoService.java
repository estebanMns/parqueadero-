package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Pago;
import com.sistema.parqueadero.repository.PagoRepository;
import java.util.List;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    public List<Pago> getPagos() {
        return pagoRepository.findAll();
    }

    public Pago obtenerPago(int id) {
        return pagoRepository.findById(id).orElse(null);
    }

    public Pago crearPago(Pago pago) {
        return pagoRepository.save(pago);
    }

    public Pago actualizarPago(Pago pago) {
        return pagoRepository.save(pago);
    }

    public void eliminarPago(int id) {
        pagoRepository.deleteById(id);
    }

    public Pago cancelarPago(int id) {
        Pago pago = obtenerPago(id);
        if (pago != null) {
            pagoRepository.delete(pago);
        }
        return pago;
    }
}
