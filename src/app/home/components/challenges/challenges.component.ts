import { Component,OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'home-challenges',
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss'
})

export class ChallengesComponent implements OnInit, OnDestroy {
  timeLeft: number = 7 * 24 * 60 * 60; // 7 días en segundos
  private timerSubscription!: Subscription;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    });
  }

  formatTime(time: number): string {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
