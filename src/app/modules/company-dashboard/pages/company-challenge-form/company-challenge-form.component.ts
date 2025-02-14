import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyChallengeService } from '../../services/company-challenge.service';
import { ChallengeCompany } from '../../../../core/models/ChallengeCompany';
import { Ods } from '../../../../core/models/Ods';

@Component({
  selector: 'app-company-challenge-form',
  templateUrl: './company-challenge-form.component.html',
  styleUrls: ['./company-challenge-form.component.scss'],
})
export class CompanyChallengeFormComponent implements OnInit {
  challenge: ChallengeCompany = {
    title: '',
    description: '',
    shortDescription: '',
    budget: 0,
    endDate: 0,
    odsList: [],
    requirements: [''],
    benefits: [''],
  };

  odsList: Ods[] = [];
  odsIds: number[] = [];
  challengeId: string | null = null;
  formattedEndDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: CompanyChallengeService
  ) {}

  ngOnInit(): void {
    this.loadOdsList();
    this.challengeId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    if (this.challengeId) {
      this.loadChallengeData(this.challengeId);
    }
  }

  loadOdsList(): void {
    this.challengeService.getOdsList().subscribe((data: Ods[]) => {
      this.odsList = data;
      console.log('ODS List:', this.odsList);
    });
  }

  loadChallengeData(id: string): void {
    this.challengeService
      .getChallengeById(id)
      .subscribe((data: ChallengeCompany) => {
        this.challenge = data;
        console.log('Challenge data:', this.challenge);
        this.odsIds = this.challenge.odsList
          .map((ods) => this.odsList.find((o) => o.name === ods.name)?.id)
          .filter((id) => id !== undefined) as number[];

        console.log(this.challenge.endDate);
        this.formattedEndDate = this.challenge.endDate.toString();
      });
  }

  onEndDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const customEndDate = new Date(inputElement.value);
    const today = new Date();
    const diffDays = Math.ceil(
      (customEndDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    this.challenge.endDate = diffDays;
  }

  addRequirement(): void {
    this.challenge.requirements?.push('');
  }

  removeRequirement(index: number): void {
    this.challenge.requirements?.splice(index, 1);
  }

  updateRequirement(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.challenge.requirements) {
      this.challenge.requirements[index] = inputElement.value;
    }
  }

  addBenefit(): void {
    this.challenge.benefits?.push('');
  }

  removeBenefit(index: number): void {
    this.challenge.benefits?.splice(index, 1);
  }

  updateBenefit(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.challenge.benefits) {
      this.challenge.benefits[index] = inputElement.value;
    }
  }

  saveChallenge(): void {
    if (
      !this.challenge.title ||
      !this.challenge.description ||
      !this.challenge.shortDescription
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

      // Ensure endDate is a number
      let endDate = this.challenge.endDate;
      if (typeof endDate === 'string') {
        const endDateObj = new Date(endDate);
        const today = new Date();
        endDate = Math.ceil(
          (endDateObj.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );
      }

    const payload = {
      title: String(this.challenge.title).trim(),
      description: String(this.challenge.description).trim(),
      shortDescription: String(this.challenge.shortDescription).trim(),
      budget: Number(this.challenge.budget),
      endDate: endDate,
      odsList: this.odsIds,
      requirements:
        this.challenge.requirements.map((req) => String(req).trim()) || [],
      benefits: this.challenge.benefits.map((ben) => String(ben).trim()) || [],
    };

    if (this.challengeId) {
      this.challengeService
        .updateChallenge(this.challengeId, payload)
        .subscribe(() => {
          this.router.navigate(['/company-dashboard/challenges']);
        });
    } else {
      console.log('Creating challenge:', payload);
      this.challengeService.createChallenge(payload).subscribe(() => {
        this.router.navigate(['/company-dashboard/challenges']);
      });
    }
  }
}
