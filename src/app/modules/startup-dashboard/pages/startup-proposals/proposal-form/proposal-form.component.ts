import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../../../services/StartupProposals.service';
import { ChallengeService } from '../../../../challenges/services/challenge.service';

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.scss']
})
export class ProposalFormComponent implements OnInit {
  proposalForm: FormGroup;
  isEditing = false;
  challengeId: number | null = null;
  proposalId: number | null = null;
  challenge: any = null; // Variable para almacenar los detalles del desafío

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private challengeService: ChallengeService
  ) {
    this.proposalForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      file: [null] // Eliminamos la validación aquí y la manejamos en onFileChange
    });
  }

  ngOnInit(): void {
    // Obtener parámetros de la URL
    const challengeIdParam = this.route.snapshot.paramMap.get('challengeId');
    const proposalIdParam = this.route.snapshot.paramMap.get('id');

    this.challengeId = challengeIdParam ? +challengeIdParam : null;
    this.proposalId = proposalIdParam ? +proposalIdParam : null;

    if (this.challengeId) {
      this.loadChallenge(this.challengeId);
    }

    if (this.proposalId) {
      this.isEditing = true;
      this.loadProposal(this.proposalId);
    }
  }

  // Cargar la información del desafío
  loadChallenge(id: number): void {
    this.challengeService.getChallengeById(id.toString()).subscribe({
      next: (challenge) => (this.challenge = challenge),
      error: (err) => console.error('Error loading challenge:', err)
    });
  }

  // Cargar la propuesta para editar
  loadProposal(id: number): void {
    if (!this.challengeId) return;

    this.proposalService.getProposalsByChallenge(this.challengeId).subscribe({
      next: (proposals) => {
        const proposal = proposals.find(p => p.id === id);
        if (proposal) {
          this.proposalForm.patchValue({
            title: proposal.title,
            description: proposal.description
          });
        }
      },
      error: (err) => console.error('Error loading proposal:', err)
    });
  }

  // Manejar la selección de archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.proposalForm.get('file')?.setValue(file);
      this.proposalForm.get('file')?.setErrors(null);
    } else {
      this.proposalForm.get('file')?.setErrors({ required: true });
    }
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.proposalForm.invalid) {
      this.proposalForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.proposalForm.get('title')?.value);
    formData.append('description', this.proposalForm.get('description')?.value);
    const fileControl = this.proposalForm.get('file')?.value;
    if (fileControl) {
      formData.append('file', fileControl);
    }

    if (this.isEditing && this.proposalId) {
      formData.append('id', this.proposalId.toString());
      this.proposalService.updateProposal(formData).subscribe({
        next: () => this.router.navigate(['/startup-dashboard/proposals']),
        error: (err) => console.error('Error updating proposal:', err)
      });
    } else if (this.challengeId) {
      this.proposalService.addProposal(this.challengeId, formData).subscribe({
        next: () => this.router.navigate(['/startup-dashboard/proposals']),
        error: (err) => console.error('Error adding proposal:', err)
      });
    }
  }
}
