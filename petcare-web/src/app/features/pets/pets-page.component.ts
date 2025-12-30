import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet, PetApiService, PetType } from '../../core/api/pet-api.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pets-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pets-page.component.html',
})
export class PetsPageComponent implements OnInit {
  private petApi = inject(PetApiService);
  private fb = inject(FormBuilder);

  pets = signal<Pet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  creating = signal(false);

  readonly petTypes: { value: PetType; label: string }[] = [
    { value: 'DOG', label: 'Chien' },
    { value: 'CAT', label: 'Chat' },
    { value: 'BIRD', label: 'Oiseau' },
    { value: 'OTHER', label: 'Autre' },
  ];

  form = this.fb.group({
    name: ['', [Validators.required]],
    type: ['DOG' as PetType, [Validators.required]],
    birthDate: [''],
  });

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading.set(true);
    this.error.set(null);

    this.petApi.list().subscribe({
      next: (pets) => {
        this.pets.set(pets);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading pets', err);
        this.loading.set(false);
        // si 401, probablement non connecté
        this.error.set('Impossible de charger vos animaux. Êtes-vous connecté ?');
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.creating.set(true);
    this.error.set(null);

    const value = this.form.getRawValue();

    this.petApi
      .create({
        name: value.name!,
        type: value.type!,
        birthDate: value.birthDate || null,
      })
      .subscribe({
        next: (created) => {
          // ajoute au début de la liste
          this.pets.update((current) => [created, ...current]);
          this.creating.set(false);
          this.form.reset({
            name: '',
            type: 'DOG',
            birthDate: '',
          });
        },
        error: (err) => {
          console.error('Error creating pet', err);
          this.creating.set(false);
          this.error.set("Impossible d'ajouter cet animal.");
        },
      });
  }

  deletePet(pet: Pet): void {
    if (!confirm(`Supprimer ${pet.name} ?`)) {
      return;
    }

    this.petApi.delete(pet.id).subscribe({
      next: () => {
        this.pets.update((current) => current.filter((p) => p.id !== pet.id));
      },
      error: (err) => {
        console.error('Error deleting pet', err);
        this.error.set('Impossible de supprimer cet animal.');
      },
    });
  }
}
