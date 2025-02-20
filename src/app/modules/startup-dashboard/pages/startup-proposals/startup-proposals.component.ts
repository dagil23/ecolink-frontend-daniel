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
  noProposalsMessage = 'No proposals available';

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

      this.proposals.forEach((proposal, index) => {
        this.proposalService.getProposalById(proposal.id).subscribe((fullProposal) => {
          this.proposals[index].title = fullProposal.title;
        });
      });
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
