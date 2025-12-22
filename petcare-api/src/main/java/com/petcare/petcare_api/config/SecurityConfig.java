package com.petcare.petcare_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Pour une API REST (on durcira ça plus tard avec JWT)
                .csrf(csrf -> csrf.disable())

                // Autorisations
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/health", "/api/health/**", "/actuator/health", "/actuator/info").permitAll()
                        .anyRequest().authenticated()
                )

                // Évite la redirection HTML vers /login
                .formLogin(form -> form.disable())

                // Si tu veux tester vite avec Basic Auth sur les autres endpoints
                .httpBasic(Customizer.withDefaults())

                .exceptionHandling(e -> e
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"unauthorized\"}");
                        })
                );

        return http.build();
    }
}
