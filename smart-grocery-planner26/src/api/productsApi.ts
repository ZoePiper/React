import type { Product } from "../types/Product";

type ApiProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
};
type ProductsResponse = {
  products: ApiProduct[];
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Api request failed");
  }

  const data: ProductsResponse = await response.json();

  return data.products.map((product) => ({
    id: product.id,
    name: product.title,
    category: product.category,
    price: product.price,
    unit: "per stuk",
  }));
}
