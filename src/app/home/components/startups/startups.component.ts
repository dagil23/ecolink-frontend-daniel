import { Component, OnInit } from '@angular/core';
import { Startup } from '../../../core/models/Startup';
import { StartupService } from '../../../core/services/StartupService.service';

@Component({
  selector: 'home-startups',
  templateUrl: './startups.component.html',
  styleUrl: './startups.component.scss'
})
export class StartupsComponent implements OnInit {
  public startups: Startup[] = [];
  constructor(private startupService: StartupService) { }

  ngOnInit(): void {
    this.startupService.getRelevantStartups().subscribe((startups: Startup[]) => {
      this.startups = startups;
    })
  }
}
