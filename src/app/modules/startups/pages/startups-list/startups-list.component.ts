import { Component, OnInit } from '@angular/core';
import { Startup } from '../../../../core/models/Startup';
import { StartupService } from '../../services/startup.service';
import { Pagination } from '../../../../core/models/Pagination';

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

  constructor(private startupService: StartupService) { }

  ngOnInit(): void {
    this.loadStartups();
  }

  loadStartups(): void {
    this.startupService.getStartups(this.filters, this.currentPage, 8).subscribe((data: Pagination<Startup>) => {
      this.startups = data.content;
      this.totalPages = data.totalPages;
    }, () => {
      alert('Error al obtener las startups');
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
