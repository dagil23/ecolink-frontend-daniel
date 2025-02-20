export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  creationDate: Date;
  imageUrl: string | null;
  startupName: string;
}
