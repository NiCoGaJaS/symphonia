package de.nicogajas.backend.exception;

import java.time.Instant;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    
    public record ErrorResponse(
            Instant timestamp,
            String error,
            String message,
            String path
    ) {
        
        public static ErrorResponse of(HttpStatusCode status, HttpServletRequest request, String message) {
            return new ErrorResponse(
                    Instant.now(),
                    status.toString(),
                    message,
                    request.getRequestURI());
        }
        
    }
    
    
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> transformResponseStatusException(
            ResponseStatusException exception,
            HttpServletRequest request
    ) {
        HttpStatusCode status = exception.getStatusCode();
        return ResponseEntity.status(status)
                .body(ErrorResponse.of(status, request, exception.getReason()));
    }
    
    
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> transformNoResourceFoundException(
            NoHandlerFoundException exception, HttpServletRequest request
    ) {
        logger.debug("No handler found for {} {}", exception.getHttpMethod(), exception.getRequestURL());
        
        HttpStatus status = HttpStatus.NOT_FOUND;
        return ResponseEntity.status(status)
                .body(ErrorResponse.of(
                        status,
                        request,
                        "Resource not found for %s %s".formatted(exception.getHttpMethod(),
                                exception.getRequestURL())));
    }
    
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> transformGenericException(Exception exception, HttpServletRequest request) {
        logger.error("Unexpected Error on {} {}", request.getMethod(), request.getRequestURI(), exception);
        
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(status)
                .body(ErrorResponse.of(
                        status,
                        request,
                        "Internal Server Error"));
    }
    
}
