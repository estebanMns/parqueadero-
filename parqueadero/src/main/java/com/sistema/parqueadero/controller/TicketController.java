package com.sistema.parqueadero.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sistema.parqueadero.models.Ticket;
import com.sistema.parqueadero.service.TicketService;
import java.util.List;

@RestController
@RequestMapping("/api/ticktet")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("")
    public List<Ticket> getTickets() {
        return ticketService.getTickets();
    }

    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable int id) {
        return ticketService.getTicket(id);
    }

    @PostMapping("/crearTicktet")
    public Ticket crearTicket(@RequestBody Ticket ticket) {
        return ticketService.crearTicket(ticket);
    }

    @PutMapping("/actualizarTicket")
    public Ticket actualizarTicket(@RequestBody Ticket ticket) {
        return ticketService.actualizarTicket(ticket);
    }

    @DeleteMapping("/eliminarTicket/{id}")
    public void eliminarTicket(@PathVariable int id) {
        ticketService.eliminarTicket(id);
    }
}
