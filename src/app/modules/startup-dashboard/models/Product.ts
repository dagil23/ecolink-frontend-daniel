import {Category} from '../../startups/models/Category';

export interface Product {
  id: number;
  categories:Category[];
  name: string;
  description: string;
  price: number;
  creationDate: Date;
  imageUrl: string | null;
  startupName: string;
}


