package com.petcare.petcare_api.pet.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "pet")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PetType type;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "owner_email", nullable = false, length = 255)
    private String ownerEmail;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    protected Pet() {

    }

    public Pet(String name, PetType type, LocalDate birthDate, String ownerEmail, OffsetDateTime createdAt) {
        this.name = name;
        this.type = type;
        this.birthDate = birthDate;
        this.ownerEmail = ownerEmail;
        this.createdAt = createdAt;
    }

    // --- Getters & setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public PetType getType() {
        return type;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(PetType type) {
        this.type = type;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}
