
export interface ProfileClient {
  name: string;
  email: string;
  level: number;
  completedMissions: any[];
  listLikePost: Post[];
}

interface Post {
  title: string;
}