import { Component, Input, OnInit, Output } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { Match } from '../../../../core/models/Match';
import { Ods } from '../../../../core/models/Ods';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.scss'
})


export class MatchCardComponent implements OnInit {


  compatibilityColor(score: number): string {
    if (score < 30) return 'bg-danger';
    if (score < 50) return 'bg-warning';
    return 'bg-success';
  }

  // Almacenar los IDs de ODS del usuario actual
  userOdsIds: number[] = [];
  userType: string = '';
  locationUser: string = '';

  @Input() match!: Match;


  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserOds();
    this.getUserType();
  }

  // Obtener las ODS del usuario actual
  getUserOds(): void {
    this.profileService.getProfile().subscribe(
      (profile: any) => {
        // Verificar si es perfil de startup (userOdsList) o de company (odsList)
        this.locationUser = profile.location;
        if (profile?.userOdsList) {
          this.userOdsIds = profile.userOdsList.map((ods: { id: number }) => ods.id);
        } else if (profile?.odsList) {
          this.userOdsIds = profile.odsList.map((ods: { id: number }) => ods.id);
        }
      },
      (error: any) => {
        console.error('Error fetching user ODS:', error);
      }
    );
  }

  getUserType(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.userType = user.userType.toLowerCase();
    });
  }

  // Verificar si una ODS coincide con las del usuario
  isMatchingOds(odsId: number): boolean {
    return this.userOdsIds.includes(odsId);
  }

  //Verificar el pais coincide con las del usuario
  isMatchingCountry(country: any): boolean {
    return this.locationUser == country ? true : false;
  }
}
