import { Component, OnInit } from '@angular/core';
import { Startup } from '../../../core/models/Startup';
import { Router } from '@angular/router';
import { Pagination } from '../../../core/models/Pagination';
import { StartupService } from '../../../core/services/StartupService.service';

@Component({
  selector: 'app-startup-view',
  templateUrl: './startup-view.component.html',
  styleUrl: './startup-view.component.scss'
})
export class StartupViewComponent implements OnInit {
  startups: Startup[] = [];
  currentPage = 0;
  totalPages = 0;
  // Filters
  search: string = '';
  odsId: number | null = null;
  isFiltered: boolean = false;
  // Alert message
  message: string = '';

  constructor(private startupService: StartupService, private router: Router) { }

  ngOnInit(): void {
    this.getStartups();
  }

  getStartups(): void {
    this.startupService.getStartups(this.currentPage, 8).subscribe((data: Pagination<Startup>) => {
      this.startups = data.content;
      this.totalPages = data.totalPages;
    }, () => {
      alert('Error al obtener las startups');
    });
  }

  changePage(page: number) {
    this.currentPage = page;

    if(this.isFiltered) {
      this.applySavedFilters();
    } else {
      this.getStartups();
    }
  }

  filteredStartups(data: Pagination<Startup>) {
    this.startups = data.content;
    this.totalPages = data.totalPages;
  }

  saveFilters(filters: {search:string, odsId: number | null}) {
    this.search = filters.search;
    this.odsId = filters.odsId;
    this.isFiltered = true;
    this.currentPage = 0;
    this.applySavedFilters();
  }

  applySavedFilters() {
    if (this.search !== '' && this.odsId === null) {
      this.startupService.getStartupsByName(this.search, this.currentPage, 8).subscribe((data: Pagination<Startup>) => {
        this.filteredStartups(data);
      }, () => {
        this.startups = [];
        this.message = 'No startups with this name were found';
      });
    } else if (this.search === '' && this.odsId !== null) {
      this.startupService.getStartupsByOds(this.odsId, this.currentPage, 8).subscribe((data: Pagination<Startup>) => {
        this.filteredStartups(data);
      }, () => {
        this.startups = [];
        this.message = 'No startups were found with this ODS';
      });
    } else if (this.search !== '' && this.odsId !== null) {
      this.startupService.getStartupsByNameAndOds(this.odsId, this.search, this.currentPage, 8).subscribe((data: Pagination<Startup>) => {
        this.filteredStartups(data);
      }, (error) => {
        this.startups = [];
        this.message = 'No startups with that name and ODS were found';
      });
    } else {
      this.getStartups();
    }
  }
}
