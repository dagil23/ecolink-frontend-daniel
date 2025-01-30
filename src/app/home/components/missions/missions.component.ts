import { Component,OnInit } from '@angular/core';
import { Mission } from '../../models/Mission';
import { MissionService } from '../../services/MissionService.service';

@Component({
  selector: 'home-missions',
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {

      missions: Mission[] = [];
      constructor(private missionService: MissionService) { }
    
    ngOnInit() {
      this.missionService.getMission().subscribe((missions: Mission[]) => {
        this.missions = missions;
      });
    }
}
