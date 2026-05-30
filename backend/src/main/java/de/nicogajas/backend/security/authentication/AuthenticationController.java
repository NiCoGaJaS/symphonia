package de.nicogajas.backend.security.authentication;

import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    
    private final Accounts accounts;
    private final PasswordEncoder encoder;
    
    
    public AuthenticationController(Accounts accounts, PasswordEncoder encoder) {
        this.accounts = accounts;
        this.encoder = encoder;
    }
    
    
    public record RegisterRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}
    
    public record RegisterResponse(
            UUID id,
            Account.Role role
    ) {}
    
    
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (accounts.existsByEmail(request.email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-Mail already in use");
        }
        
        Account account = new Account(request.email, encoder.encode(request.password), Account.Role.CUSTOMER);
        account = accounts.save(account);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponse(account.id(), account.role()));
    }
    
}
