import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent],
  template: `
    <app-loading-spinner></app-loading-spinner>
    <header class="topbar">
      <h1>Course Manager</h1>
      <p class="subtitle">Angular · HttpClient · RxJS · Interceptors</p>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
    .topbar { padding: 1.5rem 2rem 0.5rem; border-bottom: 1px solid var(--line); }
    .topbar h1 { margin: 0; font-size: 1.6rem; }
    .subtitle { margin: 0.15rem 0 1rem; color: #6b6459; font-size: 0.85rem; letter-spacing: 0.03em; }
    main { padding: 1.5rem 2rem 3rem; max-width: 960px; margin: 0 auto; }
    `,
  ],
})
export class AppComponent {}
