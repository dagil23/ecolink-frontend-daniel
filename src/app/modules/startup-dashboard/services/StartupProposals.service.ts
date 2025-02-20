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


  getStartupProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.proposalUrl}`, { withCredentials: true });
  }

  getProposalById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.proposalUrl}/${id}`, { withCredentials: true });
  }

  deleteProposal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.proposalUrl}/${id}`, { withCredentials: true });
  }
}
