import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ods } from '../../../../core/models/Ods';
import { StartupService } from '../../services/startup.service';
import { OdsService } from '../../services/ods.service';

@Component({
  selector: 'startup-filters',
  templateUrl: './startup-filters.component.html',
  styleUrl: './startup-filters.component.scss'
})
export class StartupFiltersComponent implements OnInit {
  filters = { search: '', odsId: null };
  @Output() filterChange = new EventEmitter<any>();
  theOds: Ods[] = [];

  constructor(private odsService: OdsService) { }

  ngOnInit(): void {
    this.odsService.getOds().subscribe((data: Ods[]) => {
      this.theOds = data;
    }, error => {
      console.error(error);
    })
  }

  applyFilters() {
    this.filterChange.emit({ ...this.filters });
  }

  clearFilters() {
    this.filters = { search: '', odsId: null };
    this.applyFilters();
  }
}
