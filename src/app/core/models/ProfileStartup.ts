export interface ProfileStartup {
  status: string;
  name: string;
  email: string;
  description: string;
  odsList: Ods[];
  proposals: Proposal[];
  products: Product[];
  listLikePost: Post[];
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
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
}

interface Post {
  title: string;
}
