package com.petcare.petcare_api.pet.dto;

import com.petcare.petcare_api.pet.model.PetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class PetRequest {

    @NotBlank
    private String name;

    @NotNull
    private PetType type;

    private LocalDate birthDate;

    // getters & setters

    public String getName() {
        return name;
    }

    public PetType getType() {
        return type;
    }

    public LocalDate getBirthDate() {
        return birthDate;
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
