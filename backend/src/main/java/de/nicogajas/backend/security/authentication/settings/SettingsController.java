package de.nicogajas.backend.security.authentication.settings;

import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Address;
import de.nicogajas.backend.security.authentication.PaymentDetails;

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
        
        public static PaymentResponse ofPaymentDetails(PaymentDetails payment) {
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
            String postalCode,
            String street,
            String houseNumber
    ) {
        
        public static AddressResponse ofAddress(Address address) {
            if (address == null) {
                return null;
            }
            
            return new AddressResponse(
                    address.firstName(),
                    address.lastName(),
                    address.city(),
                    address.postalCode(),
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
            String firstName,
            String lastName
    ) {}
    
    
    @PutMapping("/name")
    public void updateName(@RequestBody UpdateNameRequest request, Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        accounts.setName(account.id(), request.firstName, request.lastName);
    }
    
    
    public record UpdatePaymentDetailsRequest(
            String holder,
            String iban
    ) {}
    
    
    @PutMapping("/payment")
    public void updatePaymentDetails(@RequestBody UpdatePaymentDetailsRequest request, Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        accounts.setPayment(account.id(), request.holder, request.iban);
    }
    
    
    public record UpdateShippingAddressRequest(
            String firstName,
            String lastName,
            String city,
            String postalCode,
            String street,
            String houseNumber
    ) {}
    
    
    @PutMapping("/shipping")
    public void updateShippingAddress(
            @RequestBody UpdateShippingAddressRequest request, Authentication authentication
    ) {
        Account account = Account.fromAuthentication(authentication);
        accounts.setShipping(account.id(), request.firstName, request.lastName, request.city, request.postalCode,
                request.street, request.houseNumber);
    }
    
    
    public record UpdateBillingAddressRequest(
            String firstName,
            String lastName,
            String city,
            String postalCode,
            String street,
            String houseNumber
    ) {}
    
    
    @PutMapping("/billing")
    public void updateBillingAddress(@RequestBody UpdateBillingAddressRequest request, Authentication authentication) {
        Account account = Account.fromAuthentication(authentication);
        accounts.setBilling(account.id(), request.firstName, request.lastName, request.city, request.postalCode,
                request.street, request.houseNumber);
    }
    
}
