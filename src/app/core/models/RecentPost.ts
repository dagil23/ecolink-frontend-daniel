import { Comment } from "../../modules/blog/models/Comment";
import { Ods } from "./Ods";

export interface RecentPost {
  comments: Comment[];
  description: string;
  id: number;
  imageStartup: string;
  imageUrl: string;
  likesCount: number;
  odsList: Ods[];
  postDate: Date;
  shortDescription: string;
  startupName: string;
  title: string;
}
