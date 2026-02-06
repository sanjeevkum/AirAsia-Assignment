package com.airasia.ticketsystem.controller;

import com.airasia.ticketsystem.dto.EventRequest;
import com.airasia.ticketsystem.entity.Event;
import com.airasia.ticketsystem.entity.Seat;
import com.airasia.ticketsystem.repository.SeatRepository;
import com.airasia.ticketsystem.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow all origins for simplicity
public class EventController {
    private final EventService eventService;
    private final SeatRepository seatRepository;

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<Seat>> getSeatsForEvent(@PathVariable Long id) {
        return ResponseEntity.ok(seatRepository.findByEventId(id));
    }
}
