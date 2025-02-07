import { Ods } from "./Ods";

export interface RecentPost {
  id: number;
  startupName: string;
  title: string;
  description: string;
  likesCount: number;
  odsList: Ods[];
  postDate: Date;
}
