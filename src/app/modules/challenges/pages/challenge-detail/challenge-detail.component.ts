import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../../../core/models/Challenge';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss',
})
export class ChallengeDetailComponent {
  challengeId: string | null = null;
  challenge!: Challenge;
  isStartup: boolean = false;
  today: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    this.today.setHours(0, 0, 0, 0);
    this.challengeService
      .getChallengeById(this.challengeId)
      .subscribe((challenge: Challenge) => {
        console.log(challenge.company?.imageUrl)

        challenge.endDate = new Date(challenge.endDate); // Convertir string a Date
    challenge.endDate.setHours(0, 0, 0, 0);
        this.challenge = challenge;
        // Get image for each ODS
        for (let i = 0; i < challenge.odsList.length; i++) {
          this.authService.getImage('ods', challenge.odsList[i].image).subscribe((imageUrl: string) => {
            this.challenge.odsList[i].image = imageUrl;
          });
        }

        if(challenge.company?.imageUrl) {
          this.authService.getImage('user', challenge.company?.imageUrl).subscribe((imageUrl: string) => {
            if (this.challenge.company) {
              this.challenge.company.imageUrl = imageUrl;
            }
          });
        }
      });
    this.challengeService.getCurrentUser().subscribe((user: User) => {
      if (user.userType.toUpperCase() === 'STARTUP') {
        this.isStartup = true;
      }
    });
  }
}
