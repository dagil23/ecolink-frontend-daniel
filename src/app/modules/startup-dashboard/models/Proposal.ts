export interface Proposal {
  id: number;
  challenge: {
    id: number;
    companyName: string;
    title: string;
    shortDescription: string;
    budget: number;
    endDate: string;
    odsList: Array<{ name: string, image: string }>;
    numberOfParticipans: number | null;
    requirements: string[];
    benefits: string[];
  };
  description: string;
  date: string;
  status: string;
  link: string;
}
