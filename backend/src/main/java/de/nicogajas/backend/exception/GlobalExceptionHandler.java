package de.nicogajas.backend.exception;

import java.time.Instant;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    public record ErrorResponse(
            Instant timestamp,
            String error,
            String message,
            String path
    ) {}
    
    
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> transformResponseStatusException(
            ResponseStatusException exception,
            HttpServletRequest request
    ) {
        HttpStatusCode status = exception.getStatusCode();
        
        return ResponseEntity.status(status)
                .body(new ErrorResponse(
                        Instant.now(),
                        status.toString(),
                        exception.getReason(),
                        request.getRequestURI()));
    }
    
}
