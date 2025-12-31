package com.petcare.petcare_api.auth.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;  

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // Pour l’instant, je ne stocke pas les rôles en base => USER par défaut.
    @Transient
    private Set<Role> roles;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected AppUser() {
    }

    public AppUser(String email, String passwordHash, Set<Role> roles, Instant createdAt) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.roles = roles;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Set<Role> getRoles() {
        return (roles == null || roles.isEmpty()) ? Set.of(Role.USER) : roles;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    // setters optionnels je metttrais si besoin plus tard
}
