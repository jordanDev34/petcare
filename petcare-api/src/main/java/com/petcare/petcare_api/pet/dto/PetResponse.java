package com.petcare.petcare_api.pet.dto;

import com.petcare.petcare_api.pet.model.PetType;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public class PetResponse {

    private Long id;
    private String name;
    private PetType type;
    private LocalDate birthDate;
    private OffsetDateTime createdAt;

    public PetResponse(Long id, String name, PetType type, LocalDate birthDate, OffsetDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.birthDate = birthDate;
        this.createdAt = createdAt;
    }

    // getters

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

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
