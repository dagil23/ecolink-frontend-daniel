import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../../core/models/Challenges';
import { ChallengeService } from '../../services/challenge.service';
import { Pagination } from '../../../../core/models/Pagination';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrl: './challenges-list.component.scss'
})
export class ChallengesListComponent implements OnInit {
  challenges: Challenge[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challengeService.getChallenges(this.currentPage, 9).subscribe((data: Pagination<Challenge>) => {
      this.challenges = data.content;
      this.totalPages = data.totalPages;
    }, () => {
      alert('Error al obtener las startups');
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getChallenges();
  }
}
