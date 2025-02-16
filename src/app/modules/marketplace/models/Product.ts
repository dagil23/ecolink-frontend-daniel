import { Category } from "./Category";

export interface Product {
  categories: Category[];
  creationDate: Date;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  startupName: string;
}
