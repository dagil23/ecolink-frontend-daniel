export interface Ods {
    id?: number;
    name: string;
    image: string;
  }
  
  export interface Challenge {
    id: number;
    companyName: string;
    title: string;
    shortDescription: string;
    budget: number;
    endDate: string;
    odsList: Ods[];
    numberOfParticipans?: number | null;
    requirements: string[];
    benefits: string[];
  }
  
  export interface Proposal {
    id: number;
    challenge: Challenge;
    description: string;
    date: string;
    status: string;
  }
  
  export interface Startup {
    id: number;
    name: string;
    imageUrl: string;
    level: number;
    description: string;
    odsList: Ods[];
    proposals: Proposal[];
  }
  
  export interface DataModel {
    id: number;
    startup: Startup;
    description: string;
    date: string;
    status: string;
  }
  