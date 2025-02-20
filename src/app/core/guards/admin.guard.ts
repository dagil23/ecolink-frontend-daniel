import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/AuthService.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../models/User';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.isAuthenticated().pipe(
      switchMap(isLogged => {
        const rutaActual = state.url;
        
        if(!isLogged){
          return of(false)
        }

        
        if(rutaActual === '/admin'){
          return this.authService.getCurrentUser().pipe(
            map((user: User) => {
              console.log(user);
              if (user.userType.toUpperCase() !== 'ADMIN') {
                this.router.navigate(['/']);
                return false;
              }
              return true;
            }),
            catchError(() => {
              return of(false);
            })
          )
        }

        return of(false)
      })
    )
  }

}
