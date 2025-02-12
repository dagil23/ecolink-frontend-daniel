import { Component, OnInit, Inject } from '@angular/core';
import { CompanyChallengeService} from '../../services/company-challenge.service';
import { Challenge } from '../../../../core/models/Challenge';

@Component({
  selector: 'app-company-challenges',
  templateUrl: './company-challenges.component.html',
  styleUrls: ['./company-challenges.component.scss'],
})
export class CompanyChallengesComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(@Inject(CompanyChallengeService) private challengeService: CompanyChallengeService) {}

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challengeService
      .getCompanyChallenges()
      .subscribe((challenges: Challenge[]) => {
        this.challenges = challenges;
      });
  }

  deleteChallenge(id: number): void {
    this.challengeService.deleteChallenge(id).subscribe(() => {
      this.getChallenges();
    });
  }
}
