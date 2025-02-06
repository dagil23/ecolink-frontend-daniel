import { Component } from '@angular/core';
import {Mission} from '../../../core/models/Mission';

@Component({
  selector: 'app-mission-crud',
  templateUrl: './mission-crud.component.html',
  styleUrl: './mission-crud.component.scss'
})
export class MissionCrudComponent {
  missions: Mission[] =[];

  selectedMission: Mission | null = null;

}
