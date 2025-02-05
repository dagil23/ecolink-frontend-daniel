import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../services/ChallengeService.service';
import { Challenge } from '../../home/models/Challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.getChallenges().subscribe((challenges) => {
      this.challenges = challenges;
    }, error => {
      console.error('Error fetching challenges: ', error);
    });
  }
}
