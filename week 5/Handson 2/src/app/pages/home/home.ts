import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  // --- Task 1: Binding properties ---
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  // --- Task 2: Lifecycle hook state ---
  availableCoursesCount = 0;

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // ngOnInit fires once, after Angular has set the component's initial
  // @Input()s (there are none here) — the right place to fetch/simulate data.
  // It is NOT the constructor: the constructor runs before inputs exist and
  // should only be used for basic dependency injection / field setup.
  ngOnInit(): void {
    // Simulate fetching the count of available courses (e.g. from a service/API).
    this.availableCoursesCount = 12;
    console.log('HomeComponent initialised — courses loaded');
  }

  // ngOnDestroy fires right before Angular removes the component from the
  // DOM (e.g. when the router navigates away). This is where you unsubscribe
  // from Observables and clear timers/intervals to avoid memory leaks.
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}

/*
 * [property] vs [(ngModel)]
 * --------------------------
 * [disabled]="!isPortalActive"  -> ONE-WAY property binding.
 *   Data flows in a single direction: component -> DOM.
 *   Angular writes the component property's value into the DOM element's
 *   property. The DOM can never push a value back into the component
 *   through this binding (e.g. the user can't "type" a new value into a
 *   disabled state).
 *
 * [(ngModel)]="searchTerm"      -> TWO-WAY binding (DOM <-> component).
 *   It's syntactic sugar ("banana in a box") for:
 *     [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event"
 *   The property binding [ngModel] pushes the component value into the
 *   input, and the event binding (ngModelChange) listens for user input and
 *   writes the new value back into the component property — so both sides
 *   stay in sync automatically.
 */
