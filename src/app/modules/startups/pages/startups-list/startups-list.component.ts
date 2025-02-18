import { Component, OnInit } from '@angular/core';
import { Startup } from '../../../../core/models/Startup';
import { StartupService } from '../../services/startup.service';
import { Pagination } from '../../../../core/models/Pagination';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'startups-list',
  templateUrl: './startups-list.component.html',
  styleUrl: './startups-list.component.scss'
})
export class StartupsListComponent implements OnInit {
  startups: Startup[] = [];
  filters = { search: '', odsId: null };
  currentPage = 0;
  totalPages = 0;
  // Alert message
  message: string = '';

  constructor(private startupService: StartupService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadStartups();
  }

  loadStartups(): void {
  this.startupService.getStartups(this.filters, this.currentPage, 6).subscribe((data: Pagination<Startup>) => {
    this.startups = data.content || []; // Asegura que sea un array
    console.log('Startups:', this.startups); // Debugging

    this.message = this.startups.length === 0 ? 'No startups found' : ''; // Mensaje correcto

    this.startups.forEach((startup: Startup) => {
      if (startup?.imageUrl) {
        this.authService.getImage('user', startup.imageUrl).subscribe((imageUrl: string) => {
          startup.imageUrl = imageUrl;
        });
      }
    });

    this.totalPages = data.totalPages;
  }, (error) => {
    if (error.status === 404) {
      this.message = 'No startups found, showing all startups';
    } else {
      this.message = 'An error occurred while fetching startups';
    }
  });
}


  changePage(page: number) {
    this.currentPage = page;
    this.loadStartups();
  }

  applyFilters(filters: any) {
    this.filters = filters;
    this.currentPage = 0;
    this.loadStartups();
  }
}
