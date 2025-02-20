import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proposal} from '../../startup-dashboard/models/Proposal';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private baseUrl = `${environment.apiUrl}/proposal`;

  constructor(private http: HttpClient) {}

  getProposalById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  addProposal(challengeId: number, proposal: any): Observable<Proposal> {
    return this.http.post<Proposal>(`${this.baseUrl}/challenge/${challengeId}`, proposal, { withCredentials: true });
  }

  updateProposal(id: number, proposal: any): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.baseUrl}/${id}`, proposal, { withCredentials: true });
  }

}
