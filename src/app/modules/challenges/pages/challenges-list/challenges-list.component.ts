import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../../core/models/Challenges';
import { ChallengeService } from '../../services/challenge.service';
import { Pagination } from '../../../../core/models/Pagination';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { Proposal } from '../../../startup-dashboard/models/Proposal';
import {forkJoin, map} from 'rxjs';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.scss']
})
export class ChallengesListComponent implements OnInit {
  challenges: Challenge[] = [];
  currentPage = 0;
  totalPages = 0;
  startupsByChallenge: { [key: string]: string[] } = {}; // Diccionario con startups por challenge

  constructor(private challengeService: ChallengeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getChallenges();
    this.getProposals();
  }

  getChallenges(): void {
    this.challengeService.getChallenges(this.currentPage, 9).subscribe((data: Pagination<Challenge>) => {
      this.challenges = data.content;
      this.totalPages = data.totalPages;

      // Cargar imágenes de ODS
      this.challenges.forEach(challenge => {
        challenge.odsList.forEach(ods => {
          this.authService.getImage('ods', ods.image).subscribe((image: string) => {
            ods.image = image;
          });
        });
      });

    }, () => {
      alert('Error al obtener los challenges');
    });
  }

  getProposals(): void {
    this.challengeService.getProposalsForChallenges().subscribe((proposals: Proposal[]) => {
      this.startupsByChallenge = {}; // Reiniciamos antes de cargar nuevos datos

      const startupRequests = proposals.map(proposal => {
        return this.challengeService.getStartupById(proposal.id).pipe(
          // Guardamos el resultado en startupsByChallenge cuando la API responde
          map(startup => ({ challengeId: proposal.challenge.id, startupName: startup.name }))
        );
      });

      // Ejecutamos todas las peticiones a la vez y esperamos los resultados
      forkJoin(startupRequests).subscribe(startupResponses => {
        startupResponses.forEach(({ challengeId, startupName }) => {
          if (!this.startupsByChallenge[challengeId]) {
            this.startupsByChallenge[challengeId] = [];
          }
          if (!this.startupsByChallenge[challengeId].includes(startupName)) {
            this.startupsByChallenge[challengeId].push(startupName);
          }
        });
      });

    }, () => {
      alert('Error al obtener las propuestas del usuario');
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getChallenges();
    this.getProposals();
  }

  trackByChallenge(index: number, challenge: Challenge): number {
    return challenge.id;
  }
}
