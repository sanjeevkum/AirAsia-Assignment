package com.airasia.ticketsystem.service;

import com.airasia.ticketsystem.dto.BookingRequest;
import com.airasia.ticketsystem.entity.Booking;
import com.airasia.ticketsystem.entity.Event;
import com.airasia.ticketsystem.entity.Seat;
import com.airasia.ticketsystem.repository.BookingRepository;
import com.airasia.ticketsystem.repository.EventRepository;
import com.airasia.ticketsystem.repository.SeatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private SeatRepository seatRepository;
    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private BookingService bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBooking_ShouldSuccess_WhenSeatsAvailable() {
        BookingRequest request = new BookingRequest();
        request.setEventId(1L);
        request.setUserEmail("test@test.com");
        request.setSeatIds(Arrays.asList(1L, 2L));

        Event event = Event.builder().id(1L).name("Event").build();
        Seat s1 = Seat.builder().id(1L).seatNumber("S1").status(Seat.SeatStatus.AVAILABLE).price(new BigDecimal("100"))
                .build();
        Seat s2 = Seat.builder().id(2L).seatNumber("S2").status(Seat.SeatStatus.AVAILABLE).price(new BigDecimal("100"))
                .build();

        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(seatRepository.findAllById(request.getSeatIds())).thenReturn(Arrays.asList(s1, s2));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(i -> i.getArguments()[0]);

        Booking result = bookingService.createBooking(request);

        assertNotNull(result);
        assertEquals(Booking.BookingStatus.Confirmed, result.getStatus());
        assertEquals(new BigDecimal("200"), result.getTotalPrice());
        assertEquals(Seat.SeatStatus.BOOKED, s1.getStatus());
        verify(seatRepository, times(1)).saveAll(anyList());
    }
}
