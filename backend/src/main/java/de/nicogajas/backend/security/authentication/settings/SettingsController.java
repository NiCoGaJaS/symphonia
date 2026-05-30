package de.nicogajas.backend.security.authentication.settings;

import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    
    private final Accounts accounts;
    
    
    @Autowired
    public SettingsController(Accounts accounts) {
        this.accounts = accounts;
    }
    
    
    public record GetSettingsResponse(
            String firstName,
            String lastName,
            PaymentResponse payment,
            AddressResponse shipping,
            AddressResponse billing
    ) {
        
        public static GetSettingsResponse ofAccount(Account account) {
            return new GetSettingsResponse(
                    account.firstName(),
                    account.lastName(),
                    PaymentResponse.ofPaymentDetails(account.payment()),
                    AddressResponse.ofAddress(account.shipping()),
                    AddressResponse.ofAddress(account.billing()));
        }
        
    }
    
    public record PaymentResponse(
            String holder,
            String iban
    ) {
        
        public static PaymentResponse ofPaymentDetails(Account.PaymentDetails payment) {
            if (payment == null) {
                return null;
            }
            
            return new PaymentResponse(payment.holder(), payment.iban());
        }
        
    }
    
    public record AddressResponse(
            String firstName,
            String lastName,
            String city,
            String zipcode,
            String street,
            String houseNumber
    ) {
        
        public static AddressResponse ofAddress(Account.Address address) {
            if (address == null) {
                return null;
            }
            
            return new AddressResponse(
                    address.firstName(),
                    address.lastName(),
                    address.city(),
                    address.zipcode(),
                    address.street(),
                    address.houseNumber());
        }
        
    }
    
    
    @GetMapping()
    public GetSettingsResponse get(Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        account = accounts.findById(account.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
        return GetSettingsResponse.ofAccount(account);
    }
    
    
    public record UpdateNameRequest(
            @NotBlank String firstName,
            @NotBlank String lastName
    ) {}
    
    
    @PutMapping("/name")
    public void updateName(
            @Valid @RequestBody(required = false) UpdateNameRequest request, Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        
        if (request == null) {
            accounts.setName(account.id(), null, null);
            return;
        }
        
        accounts.setName(account.id(), request.firstName, request.lastName);
    }
    
    
    public record UpdatePaymentDetailsRequest(
            @NotBlank String holder,
            @NotBlank String iban
    ) {}
    
    
    @PutMapping("/payment")
    public void updatePaymentDetails(
            @Valid @RequestBody(required = false) UpdatePaymentDetailsRequest request, Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        
        if (request == null) {
            accounts.setPayment(account.id(), null, null);
            return;
        }
        
        accounts.setPayment(account.id(), request.holder.trim(), request.iban.trim());
    }
    
    
    public record UpdateShippingAddressRequest(
            @NotBlank String firstName,
            @NotBlank String lastName,
            @NotBlank String city,
            @NotBlank String zipcode,
            @NotBlank String street,
            @NotBlank String houseNumber
    ) {}
    
    
    @PutMapping("/shipping")
    public void updateShippingAddress(
            @Valid @RequestBody(required = false) UpdateShippingAddressRequest request, Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        
        if (request == null) {
            accounts.setShipping(account.id(), null, null, null, null, null, null);
            return;
        }
        
        accounts.setShipping(
                account.id(),
                request.firstName.trim(),
                request.lastName.trim(),
                request.city.trim(),
                request.zipcode.trim(),
                request.street.trim(),
                request.houseNumber.trim());
    }
    
    
    public record UpdateBillingAddressRequest(
            @NotBlank String firstName,
            @NotBlank String lastName,
            @NotBlank String city,
            @NotBlank String zipcode,
            @NotBlank String street,
            @NotBlank String houseNumber
    ) {}
    
    
    @PutMapping("/billing")
    public void updateBillingAddress(
            @Valid @RequestBody(required = false) UpdateBillingAddressRequest request, Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        
        if (request == null) {
            accounts.setBilling(account.id(), null, null, null, null, null, null);
            return;
        }
        
        accounts.setBilling(account.id(),
                request.firstName.trim(),
                request.lastName.trim(),
                request.city.trim(),
                request.zipcode.trim(),
                request.street.trim(),
                request.houseNumber.trim());
    }
    
}
