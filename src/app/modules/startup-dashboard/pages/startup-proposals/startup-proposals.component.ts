import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-startup-proposals',
  templateUrl: './startup-proposals.component.html',
  styleUrls: ['./startup-proposals.component.scss']
})
export class StartupProposalsComponent {
  editMode = false;
  proposalId: string | null = null;

  constructor(public router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const match = url.match(/\/startup-dashboard\/proposals\/edit\/(\d+)/);
      this.editMode = !!match;
      this.proposalId = match ? match[1] : null;
    });
  }

  isAddOrEditActive(): boolean {
    return this.router.isActive('/startup-dashboard/proposals/new', false) || this.editMode;
  }
}
