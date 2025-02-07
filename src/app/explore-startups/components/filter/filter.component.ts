import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ods } from '../../../core/models/Ods';
import { OdsService } from '../../../core/services/ods-service.service';
import { StartupService } from '../../../core/services/StartupService.service';

@Component({
  selector: 'explore-startup-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() public filteredStartups = new EventEmitter<{ search: string, odsId: number | null }>();

    theOds: Ods[] = [];
    search: string = '';
    odsId: number | null = null;

    constructor(private odsService: OdsService, private startupService: StartupService) { }

    ngOnInit(): void {
      this.odsService.getOds().subscribe((data: Ods[]) => {
        this.theOds = data;
      }, error => {
        console.error(error);
      })
    }

    applyFilters(event: Event) {
      // Emitiendo un solo objeto con los filtros
      this.filteredStartups.emit({ search: this.search, odsId: this.odsId });
    }

    clearFilters(event: Event) {
      event.preventDefault();
      this.search = '';
      this.odsId = null;
      this.filteredStartups.emit({ search: this.search, odsId: this.odsId });
    }
}
