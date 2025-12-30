package com.petcare.petcare_api.pet;

import com.petcare.petcare_api.pet.dto.PetRequest;
import com.petcare.petcare_api.pet.dto.PetResponse;
import com.petcare.petcare_api.pet.model.Pet;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<PetResponse> listPets(String ownerEmail) {
        return petRepository.findAllByOwnerEmailOrderByCreatedAtDesc(ownerEmail)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public PetResponse createPet(String ownerEmail, PetRequest request) {
        Pet pet = new Pet(
                request.getName(),
                request.getType(),
                request.getBirthDate(),
                ownerEmail,
                OffsetDateTime.now()
        );

        Pet saved = petRepository.save(pet);
        return toResponse(saved);
    }

    public PetResponse getPet(Long id, String ownerEmail) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!pet.getOwnerEmail().equalsIgnoreCase(ownerEmail)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return toResponse(pet);
    }

    public void deletePet(Long id, String ownerEmail) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!pet.getOwnerEmail().equalsIgnoreCase(ownerEmail)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        petRepository.delete(pet);
    }

    private PetResponse toResponse(Pet pet) {
        return new PetResponse(
                pet.getId(),
                pet.getName(),
                pet.getType(),
                pet.getBirthDate(),
                pet.getCreatedAt()
        );
    }
}
