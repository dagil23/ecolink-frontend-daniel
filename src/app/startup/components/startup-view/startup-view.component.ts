import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../services/StartupService.service';
import { Startup } from '../../../home/models/Startup';
import { Router } from '@angular/router';
import { Pagination } from '../../../home/models/Pagination';

@Component({
  selector: 'app-startup-view',
  templateUrl: './startup-view.component.html',
  styleUrl: './startup-view.component.scss'
})
export class StartupViewComponent implements OnInit {
  startups: Startup[] = [];
  currentPage = 0;
  totalPages = 0;
  constructor(private startupService: StartupService, private router: Router) { }

  ngOnInit(): void {
    this.getStartups();
  }

  findStartupById(id: number): void {
    this.router.navigate(['/startup', id]);
  }

  getStartups(): void {
    this.startupService.getStartups(this.currentPage, 8).subscribe((data: Pagination) => {
      this.startups = data.content;
      console.log(data.content);
      this.totalPages = data.totalPages;
    }, error => {
      console.error(error);
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getStartups();
  }
}
