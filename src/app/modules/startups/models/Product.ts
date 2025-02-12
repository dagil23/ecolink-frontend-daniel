import { Category } from "./Category";

export interface Product {
  categories: Category[];
  creationDate: Date;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  startupName: string;
}
