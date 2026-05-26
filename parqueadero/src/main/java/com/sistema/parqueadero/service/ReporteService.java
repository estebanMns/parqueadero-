package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Reporte;
import com.sistema.parqueadero.repository.ReporteRepository;
import java.util.List;

@Service
public class ReporteService {

    @Autowired
    private ReporteRepository reporteRepository;

    public List<Reporte> getReportes() {
        return reporteRepository.findAll();
    }

    public Reporte getReporte(String id) {
        return reporteRepository.findById(id).orElse(null);
    }

    public Reporte crearReporte(Reporte reporte) {
        return reporteRepository.save(reporte);
    }

    public Reporte actualizarReporte(Reporte reporte) {
        return reporteRepository.save(reporte);
    }

    public void eliminarReporte(String id) {
        reporteRepository.deleteById(id);
    }
}
