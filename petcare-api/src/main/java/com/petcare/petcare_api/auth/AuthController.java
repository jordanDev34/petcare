package com.petcare.petcare_api.auth;

import com.petcare.petcare_api.auth.dto.AuthResponse;
import com.petcare.petcare_api.auth.dto.LoginRequest;
import com.petcare.petcare_api.auth.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("{\"error\":\"unauthorized\"}");
        }

        var response = new java.util.HashMap<String, Object>();
        response.put("email", authentication.getName());
        response.put("roles", authentication.getAuthorities());

        return ResponseEntity.ok(response);
    }
}
