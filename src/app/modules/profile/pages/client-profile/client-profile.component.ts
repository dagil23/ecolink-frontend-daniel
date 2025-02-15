import { Component, OnInit} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) {}
  clientProfile: any;

  ngOnInit(): void {
    this.getClientProfile();
    this.authService.getCurrentUser().subscribe((user: User) => {
          if (user?.imageUrl) {
            this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
              this.imageUrl = imageUrl;
            });
          }
        });
  }

  getClientProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        this.clientProfile = profile;
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}
