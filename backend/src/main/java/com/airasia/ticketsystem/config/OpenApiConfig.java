package com.airasia.ticketsystem.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @org.springframework.beans.factory.annotation.Value("${server.url:http://localhost:8080}")
    private String serverUrl;

    @Bean
    public OpenAPI ticketSystemOpenAPI() {
        return new OpenAPI()
                .addServersItem(new io.swagger.v3.oas.models.servers.Server().url(serverUrl))
                .info(new Info().title("AirAsia Event Ticketing API")
                        .description("API for managing events and booking tickets")
                        .version("1.0"));
    }
}
