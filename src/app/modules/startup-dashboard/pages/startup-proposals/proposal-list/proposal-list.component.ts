import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../../../services/StartupProposals.service';

@Component({
  selector: 'app-startup-proposals',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss']
})
export class ProposalListComponent implements OnInit {
  proposals: any[] = [];
  challengeId: string | null = null; // Guardamos el challengeId obtenido de la URL
  editMode = false;
  proposalId: string | null = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.getChallengeIdFromUrl(); // Obtener challengeId antes de cargar propuestas
  }

  // Obtener challengeId desde la URL
  getChallengeIdFromUrl(): void {
    this.route.paramMap.subscribe((params) => {
      this.challengeId = params.get('challengeId'); // Suponiendo que el parámetro en la URL se llama challengeId
      if (this.challengeId) {
        this.loadProposals(); // Solo cargamos las propuestas si hay un challengeId
      }
    });
  }

  // Cargar propuestas basadas en el challengeId
  loadProposals(): void {
    if (this.challengeId) {
      const challengeIdNum = Number(this.challengeId); // Convertir a número
      if (!isNaN(challengeIdNum)) {
        this.proposalService.getProposalsByChallenge(challengeIdNum).subscribe({
          next: (data) => (this.proposals = data),
          error: (err) => console.error('Error loading proposals:', err)
        });
      } else {
        console.error('Invalid challengeId:', this.challengeId);
      }
    }
  }


  onDelete(proposalId: number): void {
    if (confirm('Are you sure you want to delete this proposal?')) {
      this.proposalService.deleteProposal(proposalId).subscribe({
        next: () => {
          this.proposals = this.proposals.filter((p) => p.id !== proposalId);
        },
        error: (err) => console.error('Error deleting proposal:', err)
      });
    }
  }

  onEdit(proposalId: number): void {
    this.router.navigate(['/startup-dashboard/proposals/edit', proposalId]);
  }
}
