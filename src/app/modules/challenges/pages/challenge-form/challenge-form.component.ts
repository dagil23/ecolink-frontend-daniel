import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import { Proposal } from '../../../../core/models/Proposal';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss'],
})
export class ChallengeFormComponent implements OnInit {
  isEditMode = false;
  proposalId?: number;
  proposal: Proposal = {
    challenge: '',
    title: '',
    description: '',
    link: '',
    //archive: null
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const challengeId = params.get('challengeId');
      const proposalId = params.get('id');

      if (proposalId) {
        this.isEditMode = true;
        this.proposalId = +proposalId;
        this.loadProposal(this.proposalId);
      } else if (challengeId) {
        this.proposal.challenge = challengeId;
      }
    });
  }

  loadProposal(id: number): void {
    this.proposalService.getProposalById(id).subscribe({
      next: (proposal) => {
        this.proposal = {
          challenge: proposal.challenge.id.toString(),
          title: proposal.title,
          description: proposal.description,
          link: proposal.link,
        };
      },
      error: (err) => {
        console.error('Error loading proposal:', err);
        this.errorMessage = 'Failed to load proposal data.';
      },
    });
  }

  private createProposal(): void {
    this.proposalService
      .addProposal(+this.proposal.challenge, this.proposal)
      .subscribe({
        next: () => this.handleSuccess('Proposal created successfully!'),
        error: (err) => this.handleError(err),
      });
  }

  private updateProposal(): void {
    if (!this.proposalId) return;

    this.proposalService
      .updateProposal(this.proposalId, this.proposal)
      .subscribe({
        next: () => this.handleSuccess('Proposal updated successfully!'),
        error: (err) => this.handleError(err),
      });
  }

  private handleSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
      window.location.href = '/challenges';
    }, 3000);
  }

  private handleError(error: any): void {
    this.errorMessage =
      error.error?.message || 'An error occurred. Please try again.';
  }

  onSubmit(): void {
    if (this.isEditMode && this.proposalId) {
      this.updateProposal();
    } else {
      this.createProposal();
    }
  }
}
