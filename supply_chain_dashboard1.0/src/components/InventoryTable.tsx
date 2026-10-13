import type { EnrichedInventoryItem } from "../types/inventory";
import StatusBadge from "./StatusBadge";

interface InventoryTableProps {
  items: EnrichedInventoryItem[];
  onSelectProduct: (product: EnrichedInventoryItem) => void;
  selectedProductId: number | null;
}

export default function InventoryTable({
  items,
  onSelectProduct,
  selectedProductId,
}: InventoryTableProps) {
  if (items.length === 0) {
    return <p>No products found. Try the search field again</p>;
  }
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={selectedProductId === item.id ? "selected" : ""}
              onClick={() => onSelectProduct(item)}
            >
              <td>{item.product}</td>
              <td> {item.sku}</td>
              <td>{item.stock}</td>
              <td>
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
