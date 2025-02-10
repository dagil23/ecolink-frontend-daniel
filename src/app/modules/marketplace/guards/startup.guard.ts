import { CanActivateFn } from '@angular/router';

export const startupGuard: CanActivateFn = (route, state) => {
  return true;
};
