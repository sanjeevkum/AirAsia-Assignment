package com.airasia.ticketsystem.service;

import com.airasia.ticketsystem.dto.EventRequest;
import com.airasia.ticketsystem.entity.Event;
import com.airasia.ticketsystem.entity.Seat;
import com.airasia.ticketsystem.repository.EventRepository;
import com.airasia.ticketsystem.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final SeatRepository seatRepository;

    @Transactional
    public Event createEvent(EventRequest request) {
        Event event = Event.builder()
                .name(request.getName())
                .description(request.getDescription())
                .date(request.getDate().toLocalDateTime()) // Convert ZonedDateTime to LocalDateTime
                .venue(request.getVenue())
                .totalSeats(request.getTotalSeats())
                .build();

        event = eventRepository.save(event);

        // Initialize seats
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= request.getTotalSeats(); i++) {
            seats.add(Seat.builder()
                    .event(event)
                    .seatNumber("S" + i)
                    .status(Seat.SeatStatus.AVAILABLE)
                    .price(new BigDecimal("100.00")) // Default price, could be in request
                    .build());
        }
        seatRepository.saveAll(seats);

        return event;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }
}
