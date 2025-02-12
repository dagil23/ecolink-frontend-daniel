import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyChallengeService } from '../../services/company-challenge.service';
import { Challenge } from '../../../../core/models/Challenge';

@Component({
  selector: 'app-company-challenge-form',
  templateUrl: './company-challenge-form.component.html',
  styleUrls: ['./company-challenge-form.component.scss'],
})
export class CompanyChallengeFormComponent implements OnInit {
  challenge: Challenge = {
    id: 0,
    title: '',
    description: '',
    budget: 0,
    endDate: new Date(),
    odsList: [],
    numberOfParticipans: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: CompanyChallengeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.challengeService
        .getChallengeById(id)
        .subscribe((challenge: Challenge) => {
          this.challenge = challenge;
        });
    }
  }

  saveChallenge(): void {
    if (this.challenge.id) {
      this.challengeService.updateChallenge(this.challenge).subscribe(() => {
        this.router.navigate(['/company-dashboard/challenges']);
      });
    } else {
      this.challengeService.createChallenge(this.challenge).subscribe(() => {
        this.router.navigate(['/company-dashboard/challenges']);
      });
    }
  }
}
