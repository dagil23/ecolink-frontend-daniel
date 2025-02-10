import { Component, Input } from '@angular/core';
import { Startup } from '../../../../core/models/Startup';

@Component({
  selector: 'startup-card',
  templateUrl: './startup-card.component.html',
  styleUrl: './startup-card.component.scss'
})
export class StartupCardComponent {
  @Input() startup!: Startup;
}
