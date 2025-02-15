import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { ProfileClient } from '../../../../core/models/ProfileClient';
import { ProfileCompany } from '../../../../core/models/ProfileCompany';
import { ProfileStartup } from '../../../../core/models/ProfileStartup';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {

  isLogged: boolean = false;
  isClient: boolean = false;
  isStartup: boolean = false;
  isCompany: boolean = false;
  userType: 'client' | 'company' | 'startup' | null = null;
  clientProfile: ProfileClient | null = null;
  companyProfile: ProfileCompany | null = null;
  startupProfile: ProfileStartup | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.isLogged = !!user;
      if (user) {
        if (user.userType.toUpperCase() === 'CLIENT') {
          this.isClient = true;
          this.userType = 'client';
        } else if (user.userType.toUpperCase() === 'STARTUP') {
          this.isStartup = true;
          this.userType = 'startup';
        } else if (user.userType.toUpperCase() === 'COMPANY') {
          this.isCompany = true;
          this.userType = 'company';
        } else {
          this.errorMessage = 'User not supported, only Client, Startup and Company are supported';
        }
      }
    });
  }
}