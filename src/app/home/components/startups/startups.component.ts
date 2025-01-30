import { Component, OnInit } from '@angular/core';
import { Startup } from '../../models/Startup';
import { StartupService } from '../../../services/StartupService.service';

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
