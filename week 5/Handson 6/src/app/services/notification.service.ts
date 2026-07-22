import { Injectable } from '@angular/core';

/**
 * Deliberately NOT providedIn: 'root'.
 * This service is registered via `providers: [NotificationService]`
 * on NotificationComponent instead, so it is scoped per-component
 * (see the comment in notification.component.ts for why).
 */
@Injectable()
export class NotificationService {

  private messages: string[] = [];

  push(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }
}
