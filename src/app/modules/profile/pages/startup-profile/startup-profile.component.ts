import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrl: './startup-profile.component.scss'
})
export class StartupProfileComponent implements OnInit {
 startupProfile: any;
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getStartupProfile();
    this.authService.getCurrentUser().subscribe((user: User) => {
      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
          console.log('Image URL:', imageUrl);
        });
      }
    });
  }

  getStartupProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        this.startupProfile = profile;
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}
