import { Component } from '@angular/core';
import { CompanyChallengeService } from '../../services/company-challenge.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'company-proposals',
  templateUrl: './company-proposals.component.html',
  styleUrl: './company-proposals.component.scss'
})
export class CompanyProposalsComponent {

  proposal: any;
  startups: any[] = [];
  clientProfile: any;
  challengeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companychallengeservice: CompanyChallengeService
  ) {}

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    this.getCompanyProposals();
    console.log('Challenge ID:', this.challengeId);
  }


  getCompanyProposals(): void {
    if (this.challengeId) {
      this.companychallengeservice.getCompanyProposal(this.challengeId).subscribe(
        (data: any) => {
          this.proposal = data;
          console.log('Proposals:', this.proposal);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      }
  }
}
