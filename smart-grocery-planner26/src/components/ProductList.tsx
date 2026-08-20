import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

function ProductList({ products, onAdd }: ProductListProps) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </section>
  );
}
export default ProductList;
