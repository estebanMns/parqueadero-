package com.sistema.parqueadero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sistema.parqueadero.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
