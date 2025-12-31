package com.petcare.petcare_api.auth;

import com.petcare.petcare_api.auth.dto.AuthResponse;
import com.petcare.petcare_api.auth.dto.LoginRequest;
import com.petcare.petcare_api.auth.dto.RegisterRequest;
import com.petcare.petcare_api.auth.model.AppUser;
import com.petcare.petcare_api.auth.model.AppUserRepository;
import com.petcare.petcare_api.auth.model.Role;
import com.petcare.petcare_api.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Locale;
import java.util.Set;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AppUserRepository userRepository;

    public AuthService(
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AppUserRepository userRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        AppUser user = new AppUser(
                email,
                passwordEncoder.encode(request.getPassword()),
                Set.of(Role.USER),
                Instant.now()
        );

        // L'id généré automatiquement
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRoles());

        return new AuthResponse(token, "Bearer");
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase(Locale.ROOT);

        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRoles());

        return new AuthResponse(token, "Bearer");
    }
}
