import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/AuthService.service';
import { User } from '../../../core/models/User';
import { Router } from '@angular/router';
import { CartCountService } from '../../../core/services/cart-count.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  isClient: boolean = false;
  isStartup: boolean = false;
  isCompany: boolean = false;
  imageUrl: string | null = null;
  username: string | null = null;
  userFullName: string | null = null;
  countCart: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartCountService: CartCountService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.isLogged = !!user;
      if (user) {
        this.username = user.username;
        this.userFullName = user.name;
        if (user.userType.toUpperCase() === 'CLIENT') {
          this.isClient = true;
        } else if (user.userType.toUpperCase() === 'STARTUP') {
          this.isStartup = true;
        } else if (user.userType.toUpperCase() === 'COMPANY') {
          this.isCompany = true;
        }
      }

      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }

      this.cartCountService.currentCount.subscribe((count: number) => {
        this.countCart = count;
      })
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLogged = false;
      this.router.navigateByUrl('/auth/login', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/').then(() => {});
      });
    });
  }
}
