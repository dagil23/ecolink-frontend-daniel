import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../services/StartupService.service';
import { Startup } from '../../../home/models/Startup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup-view',
  templateUrl: './startup-view.component.html',
  styleUrl: './startup-view.component.scss'
})
export class StartupViewComponent implements OnInit {
  startups: Startup[] = [];
  constructor(private startupService: StartupService, private router: Router) { }

  ngOnInit(): void {
    this.startupService.getStartups().subscribe((data: Startup[]) => {
      this.startups = data;
    }, error => {
      console.error(error);
    });
  }

  findStartupById(id: number): void {
    this.router.navigate(['/startup', id]);
  }
}
