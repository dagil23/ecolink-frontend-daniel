import { Ods } from "./Ods";
import { Product } from "./Product";
import { Proposal } from "./Proposal";

export interface Startup {
  id: number;
  name: string;
  imageUrl: string | null;
  level: number;
  description: string;
  odsList: Ods[];
  proposals?: Proposal[];
  products?: Product[];
}
