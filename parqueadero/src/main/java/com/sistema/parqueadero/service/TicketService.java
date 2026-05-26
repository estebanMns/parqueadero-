package com.sistema.parqueadero.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sistema.parqueadero.models.Ticket;
import com.sistema.parqueadero.repository.TicketRepository;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicket(int id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public Ticket crearTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket actualizarTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void eliminarTicket(int id) {
        ticketRepository.deleteById(id);
    }
}
