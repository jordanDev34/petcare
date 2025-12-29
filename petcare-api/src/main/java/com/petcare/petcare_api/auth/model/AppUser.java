package com.petcare.petcare_api.auth.model;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public class AppUser {

    private final UUID id;
    private final String email;
    private final String passwordHash;
    private final Set<Role> roles;
    private final Instant createdAt;

    public AppUser(UUID id, String email, String passwordHash, Set<Role> roles, Instant createdAt) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.roles = roles;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
