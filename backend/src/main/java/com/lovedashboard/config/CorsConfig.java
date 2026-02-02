package com.lovedashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Value("${cors.allowed.origins:http://localhost:3000}")
    private String allowedOrigins;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Split comma-separated origins from environment variable
                String[] origins = allowedOrigins.split(",");
                
                registry.addMapping("/api/**")
                        .allowedOrigins(origins)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600); // Cache preflight response for 1 hour
                
                // Also allow CORS for file uploads
                registry.addMapping("/uploads/**")
                        .allowedOrigins(origins)
                        .allowedMethods("GET")
                        .allowedHeaders("*")
                        .maxAge(3600);
            }
        };
    }
}

