package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Reporte;
import com.sistema.parqueadero.service.ReporteService;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("")
    public List<Reporte> getReportes() {
        return reporteService.getReportes();
    }

    @GetMapping("/{id}")
    public Reporte getReporte(@PathVariable String id) {
        return reporteService.getReporte(id);
    }

    @PostMapping("/crear_reporte")
    public Reporte crearReporte(@RequestBody Reporte reporte) {
        return reporteService.crearReporte(reporte);
    }

    @PutMapping("/actualizar_reporte")
    public Reporte actualizarReporte(@RequestBody Reporte reporte) {
        return reporteService.actualizarReporte(reporte);
    }

    @DeleteMapping("/eliminar_reporte/{id}")
    public void eliminarReporte(@PathVariable String id) {
        reporteService.eliminarReporte(id);
    }
}
