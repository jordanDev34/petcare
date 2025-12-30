package com.petcare.petcare_api.pet;

import com.petcare.petcare_api.pet.dto.PetRequest;
import com.petcare.petcare_api.pet.dto.PetResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<PetResponse> listMyPets(Authentication authentication) {
        String email = authentication.getName();
        return petService.listPets(email);
    }

    @PostMapping
    public ResponseEntity<PetResponse> createPet(
            Authentication authentication,
            @Valid @RequestBody PetRequest request
    ) {
        String email = authentication.getName();
        PetResponse created = petService.createPet(email, request);

        return ResponseEntity
                .created(URI.create("/api/pets/" + created.getId()))
                .body(created);
    }

    @GetMapping("/{id}")
    public PetResponse getPet(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return petService.getPet(id, email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        petService.deletePet(id, email);
        return ResponseEntity.noContent().build();
    }
}
