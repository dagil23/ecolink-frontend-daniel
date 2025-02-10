import { Component, Input } from '@angular/core';
import { Challenge } from '../../../../core/models/Challenges';

@Component({
  selector: 'challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss'
})
export class ChallengeCardComponent {
  @Input() challenge!: Challenge;
}
