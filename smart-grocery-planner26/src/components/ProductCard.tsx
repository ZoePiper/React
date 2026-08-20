import type { Product } from "../types/Product";
type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};
function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div>
        <p className="product-category">{product.category}</p>

        <h2> {product.name}</h2>

        <p className="product-unit">{product.unit}</p>
      </div>

      <div className="product-card-footer">
        <strong>€{product.price.toFixed(2)}</strong>

        <button onClick={() => onAdd(product)}>Toevoegen</button>
      </div>
    </article>
  );
}

export default ProductCard;
