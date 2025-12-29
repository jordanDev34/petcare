package com.petcare.petcare_api.auth;

import com.petcare.petcare_api.auth.dto.AuthResponse;
import com.petcare.petcare_api.auth.dto.LoginRequest;
import com.petcare.petcare_api.auth.dto.RegisterRequest;
import com.petcare.petcare_api.auth.model.AppUser;
import com.petcare.petcare_api.auth.model.Role;
import com.petcare.petcare_api.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Je fais un mini “repo” en mémoire pour cette 1ère version
    private final Map<String, AppUser> usersByEmail = new HashMap<>();

    public AuthService(PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

        // utilisateur de test (pour login direct)
        AppUser demo = new AppUser(
                UUID.randomUUID(),
                "demo@petcare.local",
                passwordEncoder.encode("demo1234"),
                Set.of(Role.USER),
                Instant.now()
        );
        usersByEmail.put(demo.getEmail().toLowerCase(), demo);
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase(Locale.ROOT);

        if (usersByEmail.containsKey(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        String passwordHash = passwordEncoder.encode(request.getPassword());

        AppUser user = new AppUser(
                UUID.randomUUID(),
                email,
                passwordHash,
                Set.of(Role.USER),
                Instant.now()
        );

        usersByEmail.put(email, user);

        String token = jwtService.generateToken(user.getEmail(), user.getRoles());

        return new AuthResponse(token, "Bearer");
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase(Locale.ROOT);

        AppUser user = usersByEmail.get(email);
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRoles());

        return new AuthResponse(token, "Bearer");
    }
}
