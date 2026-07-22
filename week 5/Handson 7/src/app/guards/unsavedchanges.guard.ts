import { CanDeactivateFn } from '@angular/router';

// Any component using this guard must implement this interface.
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  // canDeactivate() on the component returns true when it's safe to leave (form not dirty).
  if (component.canDeactivate()) {
    return true;
  }
  return window.confirm('You have unsaved changes. Leave?');
};
