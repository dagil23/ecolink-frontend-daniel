import { Ods } from './Ods';

export interface ChallengeCompany {
  title: string;
  description: string;
  shortDescription: string;
  budget: number;
  endDate: number;
  odsList: number[];
  requirements: string[];
  benefits: string[];
}
