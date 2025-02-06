import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../core/services/ChallengeService.service';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '../../core/models/Challenge';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss'
})
export class ChallengeDetailComponent implements OnInit {
  challengeId: string | null = null;
  challenge: Challenge | null = null;
  constructor(private route: ActivatedRoute, private challengeService: ChallengeService) { }
  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    this.challengeService.getChallenge(this.challengeId).subscribe((challenge: Challenge) => {
      console.log(challenge)
      this.challenge = challenge;
    })
  }
}
