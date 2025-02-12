import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
private baseUrl: string = environment.apiUrl + '/proposal/challenge';
  constructor(private http: HttpClient) { }

  submitProposal(proposal: any) {
    const payload = {
      title: proposal.title,
      description: proposal.description,
      link: proposal.link
  };
    return this.http.post(`${this.baseUrl}/${proposal.challenge}`, payload,{ withCredentials: true });
  }
}
