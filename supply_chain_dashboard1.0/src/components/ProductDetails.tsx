import type { EnrichedInventoryItem } from "../types/inventory";
import "./ProductDetails.css";
import StatusBadge from "./StatusBadge";

interface ProductDetailsProps {
  product: EnrichedInventoryItem;
  onClose: () => void;
}

export default function ProductDetails({
  product,
  onClose,
}: ProductDetailsProps) {
  return (
    <section className="product-details">
      <div className="product-details-header">
        <div>
          <h2>{product.product}</h2>
          <p>SKU: {product.sku}</p>
          <p>Category: {product.category}</p>
        </div>

        <button onClick={onClose}>Close</button>
      </div>

      <div className="product-details-grid">
        <div className="detail-card">
          <span>Current stock: </span>
          <strong>{product.stock} </strong>
        </div>

        <div className="detail-card">
          <span>Daily Demand: </span>
          <strong> {product.demand}</strong>
        </div>

        <div className="detail-card">
          <span>Days of stock: </span>
          <strong>{product.daysOfStock}</strong>
        </div>
      </div>

      <div className="product-details-status">
        <span> Inventory Status: </span>
        <StatusBadge status={product.status} />
      </div>
    </section>
  );
}
