package com.airasia.ticketsystem.service;

import com.airasia.ticketsystem.dto.BookingRequest;
import com.airasia.ticketsystem.entity.Booking;
import com.airasia.ticketsystem.entity.Event;
import com.airasia.ticketsystem.entity.Seat;
import com.airasia.ticketsystem.repository.BookingRepository;
import com.airasia.ticketsystem.repository.EventRepository;
import com.airasia.ticketsystem.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final EventRepository eventRepository;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Seat> seats = seatRepository.findAllById(request.getSeatIds());

        if (seats.size() != request.getSeatIds().size()) {
            throw new RuntimeException("Some seats not found");
        }

        // Check availability
        for (Seat seat : seats) {
            if (seat.getStatus() != Seat.SeatStatus.AVAILABLE) {
                throw new RuntimeException("Seat " + seat.getSeatNumber() + " is not available");
            }
        }

        // Reserve seats
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (Seat seat : seats) {
            seat.setStatus(Seat.SeatStatus.BOOKED);
            totalPrice = totalPrice.add(seat.getPrice());
        }
        seatRepository.saveAll(seats);

        // Create booking
        Booking booking = Booking.builder()
                .userEmail(request.getUserEmail())
                .event(event)
                .seats(seats)
                .bookingTime(LocalDateTime.now())
                .status(Booking.BookingStatus.Confirmed)
                .totalPrice(totalPrice)
                .build();

        return bookingRepository.save(booking);
    }
}
