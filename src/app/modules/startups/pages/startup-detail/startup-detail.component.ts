import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupService } from '../../services/startup.service';
import { StartupDetails } from '../../models/StartupDetails';

@Component({
  selector: 'startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrl: './startup-detail.component.scss'
})
export class StartupDetailComponent implements OnInit {
  startupId: string | null = null;
  startup!: StartupDetails;
  showProducts: boolean = true;
  showProposals: boolean = false;

  constructor(private route: ActivatedRoute, private startupService: StartupService) { }

  ngOnInit(): void {
    this.startupId = this.route.snapshot.paramMap.get('id');
    if (this.startupId === null) return;
    this.startupService.findStartupById(this.startupId).subscribe((startup: StartupDetails) => {
      this.startup = startup;
    }, error => {
      console.error(error);
    });
  }

  setShowProposals(): void {
    this.showProducts = false;
    this.showProposals = true;
  }

  setShowProducts(): void {
    this.showProducts = true;
    this.showProposals = false;
  }
}
