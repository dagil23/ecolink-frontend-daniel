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
    endDate: 0, // Asegura formato 'YYYY-MM-DD'
    odsList: [],
    requirements: [''],
    benefits: [''],
  };
  
  odsList: Ods[] = [];
  odsIds: number[] = []; // Lista para almacenar solo los IDs de ODS

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: CompanyChallengeService
  ) {}

  ngOnInit(): void {
    this.loadOdsList();
  }

  loadOdsList(): void {
    this.challengeService.getOdsList().subscribe((data: Ods[]) => {
      this.odsList = data;
    });
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
    if (!this.challenge.title || !this.challenge.description || !this.challenge.shortDescription) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const payload = {
      title: String(this.challenge.title).trim(),
      description: String(this.challenge.description).trim(),
      shortDescription: String(this.challenge.shortDescription).trim(),
      budget: Number(this.challenge.budget),
      endDate: this.challenge.endDate, // Formato "YYYY-MM-DD"
      odsList: this.odsIds.map(id => Number(id)), // Convertir a números correctamente
      requirements: this.challenge.requirements.map(req => String(req).trim()) || [],
      benefits: this.challenge.benefits.map(ben => String(ben).trim()) || [],
    };
    
    

    // if (this.challenge.id) {
    //   this.challengeService.updateChallenge(payload).subscribe(() => {
    //     this.router.navigate(['/company-dashboard/challenges']);
    //   });
    // } else {
      console.log('Creating challenge:', payload);
      this.challengeService.createChallenge(payload).subscribe({
      });
      console.log('finall');
    }
  }
// }
