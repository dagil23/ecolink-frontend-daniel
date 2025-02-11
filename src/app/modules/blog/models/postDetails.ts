import { Ods } from "../../../core/models/Ods";
import { Comment } from "./Comment";
import { Like } from "./Like";

export interface PostDetails {
  comments: Comment[];
  description: string;
  id: number;
  imageStartup: string;
  imageUrl: string;
  likes: Like[];
  likesCount: number;
  odsList: Ods[];
  postDate: Date;
  shortDescription: string;
  startupName: string;
  title: string;
}
