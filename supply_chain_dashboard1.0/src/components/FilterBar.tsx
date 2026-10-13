import type { InventoryStatus } from "../types/inventory";
import "./FilterBar.css";

type StatusFilter = InventoryStatus | "all";
interface FilterBarProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
}

export default function FilterBar({
  value,
  onChange,
  searchTerm,
  onSearchTermChange,
  sortOrder,
  onSortOrderChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <label htmlFor="status-filter">Filter by status </label>
      <select
        id="status-filter"
        value={value}
        onChange={(event) => onChange(event.target.value as StatusFilter)}
      >
        <option value="all"> All Products</option>
        <option value="healthy">Healthy</option>
        <option value="critical">Critical</option>
        <option value="warning">Warning</option>
      </select>

      <label htmlFor="search"> Search </label>
      <input
        id="search"
        type="search"
        placeholder="Search product or SKU..."
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
      />

      <label htmlFor="sort-order"> Sort order </label>
      <select
        id="sort-order"
        value={sortOrder}
        onChange={(event) =>
          onSortOrderChange(event.target.value as "asc" | "desc")
        }
      >
        <option value="asc">Stock: Low to High</option>
        <option value="desc">Stock: High to Low</option>
      </select>
    </div>
  );
}
