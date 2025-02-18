import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Challenge } from '../../../../core/models/Challenges';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'home-challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss'
})
export class ChallengesComponent implements OnInit, OnDestroy {
  private timerSubscription!: Subscription;
  challenges: Challenge[] = [];
  isClient: boolean = false;
  isStartup: boolean = false;

  constructor(private challengeService: ChallengeService, private authService: AuthService) {}

  ngOnInit() {
    this.challengeService.getRelevantChallenges().subscribe((challenges: Challenge[]) => {
      this.challenges = challenges;
      this.updateTimeLeft();
      this.startTimer();      
    });

    this.authService.getCurrentUser().subscribe((user: User) => {
      this.isClient = user.userType === 'CLIENT';
      this.isStartup = user.userType === 'STARTUP';
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  updateTimeLeft() {
    const now = Date.now();
    this.challenges.forEach(challenge => {
      const endDate = new Date(challenge.endDate).getTime();
      challenge.timeLeft = Math.max(0, endDate - now); // Evita valores negativos
    });
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimeLeft();
    });
  }

  formatTime(time: number): string {
    if (time <= 0) return 'Expirado';

    const totalSeconds = Math.floor(time / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
  }
}
