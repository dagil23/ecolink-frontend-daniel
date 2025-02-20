import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  isLogged: boolean = false;

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((user: User) => {
            this.isLogged = !!user;
      });
    }
    navigate(): void {
      if (this.isLogged) {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
}
