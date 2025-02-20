import { Ods } from "./Ods";

export interface Post {
  commentsCount: number;
  id: number;
  likesCount: number;
  odsList: Ods[];
  postDate: Date;
  shortDescription: string;
  startupName: string;
  title: string;
  imageUrl: string;
}
