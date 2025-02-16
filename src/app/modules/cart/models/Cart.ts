import { OrderLine } from "./OrderLine";

export interface Cart {
  id: number;
  orderLines: OrderLine[];
  purchaseDate: Date;
  status: string;
  total: number;
}
