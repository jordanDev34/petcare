import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { HealthService, HealthResponse } from '../../core/api/health.service';

type Vm = {
  loading: boolean;
  data: HealthResponse | null;
  error: string | null;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private refresh$ = new BehaviorSubject<void>(undefined);

  vm$!: Observable<Vm>;

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.vm$ = this.refresh$.pipe(
      tap(() => console.log('refresh trigger', new Date().toISOString())),
      switchMap(() =>
        this.healthService.getHealth().pipe(
          map(
            (data) =>
              ({
                loading: false,
                data,
                error: null,
              } satisfies Vm)
          ),
          startWith({ loading: true, data: null, error: null } satisfies Vm),
          catchError((err) => {
            console.error('Health API error:', err);
            return of({
              loading: false,
              data: null,
              error: 'API indisponible.',
            } satisfies Vm);
          })
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  refresh(): void {
    this.refresh$.next();
  }
}
