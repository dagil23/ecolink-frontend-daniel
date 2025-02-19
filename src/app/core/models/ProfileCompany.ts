

export interface ProfileCompany {
  
    name: string;
    email: string;
    status: string;
    description: string;
    listChallengesCompany: Challenge[];
    listLikePost: Post[];
    orders: Order[];
  }

  interface Challenge {
    shortDescription: string;
    budget: number;
    numberOfParticipans: number;
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