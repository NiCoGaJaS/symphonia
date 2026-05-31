package de.nicogajas.backend.settings;

import de.nicogajas.backend.security.SecurityConfig;
import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.settings.SettingsController;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(SettingsController.class)
@Import(SecurityConfig.class)
public class SettingsTest {
    
    @Autowired
    MockMvc mvc;
    
    @Autowired
    ObjectMapper json;
    
    @MockitoBean
    Accounts accounts;
    
    
    private static Account createMinimalAccount() {
        return new Account(
                UUID.randomUUID(),
                Instant.now(),
                "example@symphonia.com",
                "secret",
                Account.Role.CUSTOMER,
                null,
                null,
                null,
                null,
                null
        );
    }
    
    
    private static Account createExampleAccount() {
        Account.PaymentDetails payment = new Account.PaymentDetails("Max Mustermann", "DE00 0000 0000 0000 0000 00");
        Account.Address shipping = new Account.Address(
                "Max", "Mustermann",
                "Musterstadt", "12345",
                "Musterstraße", "1"
        );
        Account.Address billing = new Account.Address(
                "Max", "Mustermann",
                "Anderestadt", "54321",
                "Anderestraße", "2"
        );
        
        return new Account(
                UUID.randomUUID(),
                Instant.now(),
                "example@symphonia.com",
                "secret",
                Account.Role.CUSTOMER,
                "Max",
                "Mustermann",
                payment,
                shipping,
                billing
        );
    }
    
    
    @Test
    void getSettingForExistingAccount() throws Exception {
        Account account = createExampleAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        mvc.perform(get("/api/settings").with(user(account)))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON),
                        jsonPath("$.first_name", is(account.firstName())),
                        jsonPath("$.last_name", is(account.lastName())),
                        jsonPath("$.payment.holder", is(account.payment().holder())),
                        jsonPath("$.payment.iban", is(account.payment().iban())),
                        jsonPath("$.shipping.first_name", is(account.shipping().firstName())),
                        jsonPath("$.shipping.last_name", is(account.shipping().lastName())),
                        jsonPath("$.shipping.city", is(account.shipping().city())),
                        jsonPath("$.shipping.zipcode", is(account.shipping().zipcode())),
                        jsonPath("$.shipping.street", is(account.shipping().street())),
                        jsonPath("$.shipping.house_number", is(account.shipping().houseNumber())),
                        jsonPath("$.billing.first_name", is(account.billing().firstName())),
                        jsonPath("$.billing.last_name", is(account.billing().lastName())),
                        jsonPath("$.billing.city", is(account.billing().city())),
                        jsonPath("$.billing.zipcode", is(account.billing().zipcode())),
                        jsonPath("$.billing.street", is(account.billing().street())),
                        jsonPath("$.billing.house_number", is(account.billing().houseNumber()))
                );
        
        verify(accounts).findById(account.id());
    }
    
    
    @Test
    void failGetSettingsWithoutAuthentication() throws Exception {
        mvc.perform(get("/api/settings"))
                .andExpect(status().isUnauthorized());
    }
    
    
    @Test
    void updateName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateNameRequest request = new SettingsController.UpdateNameRequest(
                "John",
                "Doe"
        );
        
        mvc.perform(
                put("/api/settings/name")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isOk());
        
        verify(accounts).setName(account.id(), request.firstName(), request.lastName());
    }
    
    
    @Test
    void clearName() throws Exception {
        Account account = createExampleAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        mvc.perform(put("/api/settings/name").with(user(account)))
                .andExpect(status().isOk());
        
        verify(accounts).setName(account.id(), null, null);
    }
    
    
    @Test
    void failUpdateNameWithInvalidFirstName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateNameRequest request = new SettingsController.UpdateNameRequest(
                "",
                "Doe"
        );
        
        mvc.perform(
                put("/api/settings/name")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setName(any(), any(), any());
    }
    
    
    @Test
    void failUpdateNameWithInvalidLastName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateNameRequest request = new SettingsController.UpdateNameRequest(
                "John",
                ""
        );
        
        mvc.perform(
                put("/api/settings/name")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setName(any(), any(), any());
    }
    
    
    @Test
    void updatePayment() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdatePaymentDetailsRequest request = new SettingsController.UpdatePaymentDetailsRequest(
                "John Doe",
                "DE01 2345 6789 0123 4567 89"
        );
        
        mvc.perform(
                put("/api/settings/payment")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isOk());
        
        verify(accounts).setPayment(account.id(), request.holder(), request.iban());
    }
    
    
    @Test
    void clearPayment() throws Exception {
        Account account = createExampleAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        mvc.perform(put("/api/settings/payment").with(user(account)))
                .andExpect(status().isOk());
        
        verify(accounts).setPayment(account.id(), null, null);
    }
    
    
    @Test
    void failUpdatePaymentWithInvalidHolder() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdatePaymentDetailsRequest request = new SettingsController.UpdatePaymentDetailsRequest(
                "",
                "DE01 2345 6789 0123 4567 89"
        );
        
        mvc.perform(
                put("/api/settings/payment")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setPayment(any(), any(), any());
    }
    
    
    @Test
    void failUpdatePaymentWithInvalidIban() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdatePaymentDetailsRequest request = new SettingsController.UpdatePaymentDetailsRequest(
                "John Doe",
                " "
        );
        
        mvc.perform(
                put("/api/settings/payment")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setPayment(any(), any(), any());
    }
    
    
    @Test
    void updateShipping() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "Doe",
                "Anderestadt", "54321",
                "Anderestraße", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isOk());
        
        verify(accounts).setShipping(
                account.id(),
                request.firstName(), request.lastName(),
                request.city(), request.zipcode(),
                request.street(), request.houseNumber()
        );
    }
    
    
    @Test
    void clearShipping() throws Exception {
        Account account = createExampleAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        mvc.perform(put("/api/settings/shipping").with(user(account)))
                .andExpect(status().isOk());
        
        verify(accounts).setShipping(
                account.id(),
                null, null,
                null, null,
                null, null
        );
    }
    
    
    @Test
    void failUpdateShippingWithInvalidFirstName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "", "Doe",
                "Anderestadt", "54321",
                "Anderestraße", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateShippingWithInvalidLastName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "",
                "Anderestadt", "54321",
                "Anderestraße", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateShippingWithInvalidCity() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "Doe",
                "", "54321",
                "Anderestraße", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateShippingWithInvalidZipcode() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "Doe",
                "Anderestadt", "",
                "Anderestraße", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateShippingWithInvalidStreet() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "Doe",
                "Anderestadt", "54321",
                "", "2"
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateShippingWithInvalidHouseNumber() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateShippingAddressRequest request = new SettingsController.UpdateShippingAddressRequest(
                "John", "Doe",
                "Anderestadt", "54321",
                "Anderestraße", ""
        );
        
        mvc.perform(
                put("/api/settings/shipping")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setShipping(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void updateBilling() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", "Mustermann",
                "Musterstadt", "12345",
                "Musterstraße", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isOk());
        
        verify(accounts).setBilling(
                account.id(),
                request.firstName(), request.lastName(),
                request.city(), request.zipcode(),
                request.street(), request.houseNumber()
        );
    }
    
    
    @Test
    void clearBilling() throws Exception {
        Account account = createExampleAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        mvc.perform(put("/api/settings/billing").with(user(account)))
                .andExpect(status().isOk());
        
        verify(accounts).setBilling(
                account.id(),
                null, null,
                null, null,
                null, null
        );
    }
    
    
    @Test
    void failUpdateBillingWithInvalidFirstName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                " ", "Mustermann",
                "Musterstadt", "12345",
                "Musterstraße", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateBillingWithInvalidLastName() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", " ",
                "Musterstadt", "12345",
                "Musterstraße", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateBillingWithInvalidCity() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", "Mustermann",
                " ", "12345",
                "Musterstraße", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateBillingWithInvalidZipcode() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", "Mustermann",
                "Musterstadt", " ",
                "Musterstraße", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateBillingWithInvalidStreet() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", "Mustermann",
                "Musterstadt", "12345",
                " ", "1"
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
    
    @Test
    void failUpdateBillingWithInvalidHouseNumber() throws Exception {
        Account account = createMinimalAccount();
        when(accounts.findById(account.id())).thenReturn(Optional.of(account));
        
        SettingsController.UpdateBillingAddressRequest request = new SettingsController.UpdateBillingAddressRequest(
                "Max", "Mustermann",
                "Musterstadt", "12345",
                "Musterstraße", " "
        );
        
        mvc.perform(
                put("/api/settings/billing")
                        .with(user(account))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(request))
        ).andExpect(status().isBadRequest());
        
        verify(accounts, never()).setBilling(any(), any(), any(), any(), any(), any(), any());
    }
    
}
