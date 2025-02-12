import { Component, OnInit } from '@angular/core';
import { Proposal } from '../../../../core/models/Proposal';
import { ProposalService } from '../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss'],
})
export class ChallengeFormComponent implements OnInit {
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
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.proposal.challenge = id || '';
    });
  }
    // onFileSelect(event: any) {
  //   const file = event.target.files[0];
  //   console.log('Selected file:', file);
  // }

  onSubmit() {
    console.log('Proposal submitted:', this.proposal);
    this.proposalService.submitProposal(this.proposal).subscribe({
      next: (data) => {
        console.log('Response:', data);
        this.successMessage = 'Proposal submitted successfully!';
        this.errorMessage = '';
        setTimeout(() => {
          this.successMessage = '';
          window.location.href = '/challenges';
        }, 3000);
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'You alredy submitted a proposal for this challenge';
        }
      },
    });
  }
}
