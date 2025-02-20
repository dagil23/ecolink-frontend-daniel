import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../../core/models/Challenges';
import { ChallengeService } from '../../services/challenge.service';
import { Pagination } from '../../../../core/models/Pagination';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrl: './challenges-list.component.scss'
})
export class ChallengesListComponent implements OnInit {
  challenges: Challenge[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private challengeService: ChallengeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challengeService.getChallenges(this.currentPage, 9).subscribe((data: Pagination<Challenge>) => {
      this.challenges = data.content;
      console.log(data.content)
      this.totalPages = data.totalPages;

      for(let i = 0; i < this.challenges.length; i++) {
        for(let j = 0; j < this.challenges[i].odsList.length; j++) {
          this.authService.getImage('ods', this.challenges[i].odsList[j].image).subscribe((image: string) => {
            this.challenges[i].odsList[j].image = image;
          })
        }
      }
    }, () => {
      alert('Error al obtener las startups');
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getChallenges();
  }
}
