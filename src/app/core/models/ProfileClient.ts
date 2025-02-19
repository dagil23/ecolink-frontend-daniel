
export interface ProfileClient {
  name: string;
  email: string;
  level: number;
  completedMissions: any[];
  listLikePost: Post[];
  orders: Order[];
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
interface Product {
  id?: number;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  creationDate?: string;
  categories?: Category[];
}

interface Category {
  id: number;
  name: string;
}