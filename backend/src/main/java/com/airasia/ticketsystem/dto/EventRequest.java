package com.airasia.ticketsystem.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
public class EventRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "Date is required")
    @Future(message = "Event date must be in the future")
    private ZonedDateTime date;

    @NotBlank(message = "Venue is required")
    private String venue;

    @Min(value = 1, message = "Total seats must be at least 1")
    private int totalSeats;
}
