import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/AuthService.service';
import { User } from '../../../core/models/User';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  isClient: boolean = false;
  imageUrl: string | null = null;
  username: string | null = null;
  userFullName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      this.isLogged = !!user;
      if (user) {
        this.username = user.username;
        this.userFullName = user.name;
        if (user.userType.toUpperCase() === 'CLIENT') {
          this.isClient = true;
        }
      }

      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }
    });
  }
}
