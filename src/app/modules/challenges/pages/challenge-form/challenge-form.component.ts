import { Component } from '@angular/core';
import { Proposal } from '../../../../core/models/Proposal';
import { ProposalService } from '../../services/proposal.service';
import { string } from 'mathjs';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrl: './challenge-form.component.scss',
})
export class ChallengeFormComponent {
  proposal: Proposal = {
    id: 0,
    challenge: 0,
    title: '',
    description: '',
    //archivo: '',
    link: '',
    date: new Date(),
    status: 'PENDING',
  };

  constructor(private proposalservice: ProposalService) {}

  // onFileSelect(event: any) {
  //   const file = event.target.files[0];
  //   console.log('Archivo seleccionado:', file);
  // }

  onSubmit() {
    this.proposalservice.submitProposal(this.proposal);
    console.log('Proposal submitted:', this.proposal);
  }
}
