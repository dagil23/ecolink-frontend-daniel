import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { Product } from '../../../startups/models/Product';

@Component({
  selector: 'startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrl: './startup-profile.component.scss'
})
export class StartupProfileComponent implements OnInit {
  startupProfile: any;
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStartupProfile();
    this.authService.getCurrentUser().subscribe((user: User) => {
      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }
    });
  }

  getStartupProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        console.log('Perfil:', profile);
        this.startupProfile = profile;
        this.startupProfile.products.forEach((product: Product) => {
          this.authService.getImage('product', product.imageUrl).subscribe((imageUrl: string) => {
            product.imageUrl = imageUrl;
          });
        });
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}
