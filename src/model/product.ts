export type AddProductInput = {
  title: string;
  price: number;
  description: string;
  categories: string[];
};

export type ProductDetail = AddProductInput & {
  image: string;
};
