export interface ProfileStartup {
  status: string;
  name: string;
  email: string;
  description: string;
  odsList: Ods[];
  proposals: Proposal[];
  products: Product[];
  listLikePost: Post[];
  orders: Order[];
}

interface Ods {
  name: string;
}

interface Proposal {
  challengeTitle: string;
  description: string;
  status: string;
}

interface Product {
  id?: number;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  creationDate?: string;
  categories?: Category[];
}

interface Post {
  title: string;
}

interface Order {
  id: number;
  status: string;
  purchaseDate: string;
  total: number;
  orderLines: OrderLine[];
}

interface OrderLine {
  id: number;
  product: Product;
  amount: number;
}

interface Category {
  id: number;
  name: string;
}
