package de.nicogajas.backend.security;

import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Role;

import java.util.UUID;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tools.jackson.databind.ObjectMapper;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {
    
    public record LoginResponse(
            UUID id,
            Role role
    ) {}
    
    
    @Bean
    public SecurityFilterChain filter(HttpSecurity http, ObjectMapper json) {
        return http.csrf(CsrfConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(
                                (_, response, _) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                        .accessDeniedHandler((_, response, _) -> response.sendError(HttpServletResponse.SC_FORBIDDEN)))
                .formLogin(form -> form
                        .loginProcessingUrl("/auth/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler((_, response, authentication) -> {
                            Account account = Account.fromAuthentication(authentication);
                            
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                            
                            json.writeValue(response.getWriter(), new LoginResponse(account.id(), account.role()));
                        }))
                .build();
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
    
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
    
}
