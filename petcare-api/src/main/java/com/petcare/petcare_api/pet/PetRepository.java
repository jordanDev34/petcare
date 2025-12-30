package com.petcare.petcare_api.pet;

import com.petcare.petcare_api.pet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findAllByOwnerEmailOrderByCreatedAtDesc(String ownerEmail);
}
