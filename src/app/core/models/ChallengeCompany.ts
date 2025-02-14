
export interface ChallengeCompany {
  title: string;
  description: string;
  shortDescription: string;
  budget: number;
  endDate: number;
  odsList: { id: number, name: string }[];
  requirements: string[];
  benefits: string[];
}
