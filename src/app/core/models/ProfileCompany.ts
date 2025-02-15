

export interface ProfileCompany {
  
    name: string;
    email: string;
    status: string;
    description: string;
    listChallengesCompany: Challenge[];
    listLikePost: Post[];

  }

  interface Challenge {
    shortDescription: string;
    budget: number;
    numberOfParticipans: number;
  }
  
  interface Post {
    title: string;
  }