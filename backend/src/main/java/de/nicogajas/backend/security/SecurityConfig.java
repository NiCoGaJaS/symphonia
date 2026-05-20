package de.nicogajas.backend.security;

import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Role;

import java.util.List;
import java.util.UUID;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tools.jackson.databind.ObjectMapper;

@Configuration
public class SecurityConfig {
    
    public record LoginResponse(
            UUID id,
            Role role
    ) {}
    
    
    @Bean
    public SecurityFilterChain filter(HttpSecurity http, ObjectMapper json) {
        return http.csrf(CsrfConfigurer::disable)
                .cors(this::cors)
                .authorizeHttpRequests(this::authorization)
                .exceptionHandling(this::exceptions)
                .formLogin(form -> login(form, json))
                .logout(this::logout)
                .build();
    }
    
    
    private void cors(CorsConfigurer<HttpSecurity> configurer) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        configurer.configurationSource(source);
    }
    
    
    private void authorization(
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
    ) {
        auth.requestMatchers("/api/admin/**").hasRole(Role.ADMIN.name())
                .anyRequest().permitAll();
    }
    
    
    private void exceptions(ExceptionHandlingConfigurer<HttpSecurity> exceptions) {
        exceptions.authenticationEntryPoint((_, response, _) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .accessDeniedHandler((_, response, _) -> response.sendError(HttpServletResponse.SC_FORBIDDEN));
    }
    
    
    private void login(FormLoginConfigurer<HttpSecurity> form, ObjectMapper json) {
        form.loginProcessingUrl("/auth/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler((_, response, authentication) -> {
                    Account account = Account.fromAuthentication(authentication);
                    
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    
                    json.writeValue(response.getWriter(), new LoginResponse(account.id(), account.role()));
                })
                .failureHandler((_, response, _) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                });
    }
    
    
    private void logout(LogoutConfigurer<HttpSecurity> logout) {
        logout.logoutUrl("/auth/logout")
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((_, response, _) -> response.setStatus(HttpServletResponse.SC_NO_CONTENT));
    }
    
    
    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.fromHierarchy("ROLE_ADMIN > ROLE_CUSTOMER");
    }
    
    
    @Bean
    public UserDetailsService userDetailsService(Accounts accounts) {
        return email -> accounts.findByEmail(email).orElseThrow(() -> UsernameNotFoundException.fromUsername(email));
    }
    
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}
