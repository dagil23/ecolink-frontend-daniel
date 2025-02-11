import { Ods } from "./Ods";

export interface Post {
  id: number;
  imageUrl: string;
  likesCount: number;
  numberComents: number;
  odsList: Ods[];
  postDate: Date;
  shortDescription: string;
  startupName: string;
  title: string;
}
