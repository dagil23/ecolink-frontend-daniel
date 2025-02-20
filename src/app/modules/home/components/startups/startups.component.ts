import { Component, OnInit } from '@angular/core';
import { Startup } from '../../../../core/models/Startup';
import { StartupService } from '../../services/startup.service';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'home-startups',
  templateUrl: './startups.component.html',
  styleUrl: './startups.component.scss'
})
export class StartupsComponent implements OnInit {
  public startups: Startup[] = [];
  constructor(private startupService: StartupService, private authService: AuthService) { }

  ngOnInit(): void {
    this.startupService.getRelevantStartups().subscribe((startups: Startup[]) => {
      this.startups = startups;
      startups.forEach(startup => {
        if (startup.imageUrl != null) {
          this.authService.getImage('user', startup.imageUrl).subscribe((imageUrl: string) => {
            startup.imageUrl = imageUrl;
          }
          );
        }
      });
    })
  }
}
