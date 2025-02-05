import { Component, OnInit } from '@angular/core';
import { Mission } from '../../models/Mission';
import { MissionService } from '../../../services/MissionService.service';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'home-missions',
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {
  missions: Mission[] = [];
  isClient: boolean = false;
  constructor(private missionService: MissionService, private authService: AuthService) { }

  ngOnInit() {
    this.missionService.getMission().subscribe((missions: Mission[]) => {
      this.missions = missions;
    });
    this.authService.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.isClient = user.usertype === 'client';
    })
  }
  completeMission(mission: Mission): void {
    mission.completed = true;
    this.missionService.updateMission(mission).subscribe();
  }
}
