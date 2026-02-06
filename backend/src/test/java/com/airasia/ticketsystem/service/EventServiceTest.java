package com.airasia.ticketsystem.service;

import com.airasia.ticketsystem.dto.EventRequest;
import com.airasia.ticketsystem.entity.Event;
import com.airasia.ticketsystem.repository.EventRepository;
import com.airasia.ticketsystem.repository.SeatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private SeatRepository seatRepository;

    @InjectMocks
    private EventService eventService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createEvent_ShouldSaveEventAndInitializeSeats() {
        EventRequest request = new EventRequest();
        request.setName("Concert");
        request.setTotalSeats(10);
        request.setDate(ZonedDateTime.now().plusDays(1));
        request.setVenue("Stadium");

        Event savedEvent = Event.builder()
                .id(1L)
                .name("Concert")
                .totalSeats(10)
                .build();

        when(eventRepository.save(any(Event.class))).thenReturn(savedEvent);

        Event result = eventService.createEvent(request);

        assertNotNull(result);
        assertEquals("Concert", result.getName());
        verify(eventRepository, times(1)).save(any(Event.class));
        verify(seatRepository, times(1)).saveAll(anyList());
    }

    @Test
    void getEventById_ShouldReturnEvent_WhenFound() {
        Event event = Event.builder().id(1L).name("Concert").build();
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        Event result = eventService.getEventById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }
}
