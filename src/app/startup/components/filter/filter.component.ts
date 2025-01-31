import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OdsService } from '../../../services/ods-service.service';
import { Ods } from '../../../home/models/Ods';
import { StartupService } from '../../../services/StartupService.service';

@Component({
  selector: 'startup-filter',
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
    event.preventDefault();
    // Emitiendo un solo objeto con los filtros
    this.filteredStartups.emit({ search: this.search, odsId: this.odsId });
  }
}
