import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../core/models/Challenge';
import { Pagination } from '../../core/models/Pagination';
import { ChallengeService } from '../../core/services/ChallengeService.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit {
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
