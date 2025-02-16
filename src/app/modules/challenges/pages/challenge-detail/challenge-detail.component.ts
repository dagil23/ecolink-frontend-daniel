import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../../../core/models/Challenge';
import { User } from '../../../../core/models/User';

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
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    this.challengeService
      .getChallengeById(this.challengeId)
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
      });
    this.challengeService.getCurrentUser().subscribe((user: User) => {
      if (user.userType.toUpperCase() === 'STARTUP') {
        this.isStartup = true;
      }
    });
  }
}
