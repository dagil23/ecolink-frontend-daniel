import { Ods } from "../../../core/models/Ods";
import { Comment } from "./Comment";

export interface PostDetails {
  id: number;
  startupName: string;
  title: string;
  shortDescription: string;
  description: string;
  likesCount: number;
  odsList: Ods[];
  postDate: Date;
  comments: Comment[];
}
