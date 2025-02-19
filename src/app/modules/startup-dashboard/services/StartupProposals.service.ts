import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proposal } from '../models/Proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private proposalUrl = `${environment.apiUrl}/proposal`;

  constructor(private http: HttpClient) {}

  getProposalsByChallenge(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.proposalUrl}/challenge/${id}`, { withCredentials: true });
  }

  getStartupProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.proposalUrl}`, { withCredentials: true });
  }

  addProposal(id: number, formData: FormData): Observable<Proposal> {
    return this.http.post<Proposal>(`${this.proposalUrl}/challenge/${id}`, formData, { withCredentials: true });
  }

  updateProposal(formData: FormData): Observable<Proposal> {
    const id = formData.get('id');
    return this.http.put<Proposal>(`${this.proposalUrl}/${id}`, formData, { withCredentials: true });
  }

  deleteProposal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.proposalUrl}/${id}`, { withCredentials: true });
  }
}
