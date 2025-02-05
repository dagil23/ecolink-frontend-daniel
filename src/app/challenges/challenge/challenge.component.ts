import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../services/ChallengeService.service';
import { Challenge } from '../../home/models/Challenge';
import { Pagination } from '../../home/models/Pagination';

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
      console.log(data)
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
