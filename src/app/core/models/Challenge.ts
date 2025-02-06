import { CompanyChallenge } from "./CompanyChallenge";
import { Ods } from "./Ods";

export interface Challenge {
  id: number;
  title: string;
  description: string;
  budget: number;
  startDate?: Date;
  endDate: Date;
  company?: CompanyChallenge;
  requirements?: string[];
  benefits?: string[];
  numberOfParticipans: number;
  odsList: Ods[];
}
