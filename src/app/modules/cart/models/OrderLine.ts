import { Product } from "./Product";

export interface OrderLine {
  amount: number;
  id: number;
  product: Product;
}
