import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PetType = 'DOG' | 'CAT' | 'BIRD' | 'OTHER';

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  birthDate: string | null;
  createdAt: string;
}

export interface CreatePetPayload {
  name: string;
  type: PetType;
  birthDate?: string | null;
}

@Injectable({ providedIn: 'root' })
export class PetApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/pets';

  list(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  create(payload: CreatePetPayload): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
