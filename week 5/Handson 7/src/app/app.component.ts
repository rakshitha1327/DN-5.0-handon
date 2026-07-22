import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/courses" routerLinkActive="active">Courses</a>
      <a routerLink="/profile" routerLinkActive="active">Profile</a>
      <a routerLink="/enroll" routerLinkActive="active">Enroll</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
