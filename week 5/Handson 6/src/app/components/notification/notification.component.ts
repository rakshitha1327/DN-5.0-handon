import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  // Component-level provider. Because NotificationService is listed
  // here instead of using `providedIn: 'root'` on the service itself,
  // Angular creates a BRAND NEW instance of NotificationService every
  // time a NotificationComponent is instantiated, and that instance
  // is only visible to this component and its children (a separate
  // child-level injector is inserted into the DI tree at this point).
  //
  // Why that matters: if two <app-notification> instances exist on
  // the same page (e.g. one per course card, or one per tab in a
  // wizard), each gets its OWN message list. A root-provided service
  // would force them to share one global list, which is wrong when
  // the state is meant to be local to that one component instance.
  // This mirrors patterns like a multi-step form wizard where each
  // step's component needs isolated, non-leaking state.
  providers: [NotificationService]
})
export class NotificationComponent {

  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  addMessage(text: string): void {
    this.notificationService.push(text);
  }

  clear(): void {
    this.notificationService.clear();
  }
}
