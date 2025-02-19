import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';  // Importa el servicio
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfile: any;
  isLogged: boolean = false;
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCompanyProfile();
    this.authService.getCurrentUser().subscribe((user: User) => {
      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }
    });
  }

  getCompanyProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        this.companyProfile = profile;
        console.log('Perfil de la empresa:', this.companyProfile);
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}
