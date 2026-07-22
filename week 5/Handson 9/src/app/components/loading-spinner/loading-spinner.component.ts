import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.isLoading$ | async) {
      <div class="bar" role="status" aria-label="Loading"></div>
    }
  `,
  styles: [
    `
    .bar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--accent);
      animation: sweep 1s ease-in-out infinite;
      z-index: 100;
    }
    @keyframes sweep {
      0% { transform: scaleX(0); transform-origin: left; }
      50% { transform: scaleX(1); transform-origin: left; }
      50.01% { transform-origin: right; }
      100% { transform: scaleX(0); transform-origin: right; }
    }
    `,
  ],
})
export class LoadingSpinnerComponent {
  protected loadingService = inject(LoadingService);
}
