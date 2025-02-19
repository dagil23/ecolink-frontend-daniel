import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService} from '../../services/StartupProposals.service';
import { Proposal} from '../../models/Proposal';

@Component({
  selector: 'app-startup-proposals',
  templateUrl: './startup-proposals.component.html',
  styleUrls: ['./startup-proposals.component.scss'],
})
export class StartupProposalsComponent implements OnInit {
  proposals: Proposal[] = [];

  constructor(
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals(): void {
    this.proposalService.getStartupProposals().subscribe((data) => {
      this.proposals = data;
    });
  }

  editProposal(proposalId: number): void {
    this.router.navigate([`/challenges/form`, proposalId]);
  }

  deleteProposal(proposalId: number): void {
    if (confirm('Are you sure you want to delete this proposal?')) {
      this.proposalService.deleteProposal(proposalId).subscribe(() => {
        this.loadProposals();
      });
    }
  }
}
