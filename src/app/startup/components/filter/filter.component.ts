import { Component, OnInit } from '@angular/core';
import { OdsService } from '../../../services/ods-service.service';
import { Ods } from '../../../home/models/Ods';

@Component({
  selector: 'startup-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  theOds: Ods[] = [];
  constructor(private odsService: OdsService) { }

  ngOnInit(): void {
    this.odsService.getOds().subscribe((data: Ods[]) => {
      this.theOds = data;
    }, error => {
      console.error(error);
    })
  }
}
