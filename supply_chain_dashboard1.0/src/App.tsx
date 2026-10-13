import { inventory } from "./data/inventory";
import { enrichInventory } from "./utils/enrichInventory";
import InventoryTable from "./components/InventoryTable";
import SummaryCards from "./components/SummaryCards";
import FilterBar from "./components/FilterBar";
import { useState } from "react";
import type { InventoryStatus } from "./types/inventory";
import type { EnrichedInventoryItem } from "./types/inventory";
import ProductDetails from "./components/ProductDetails";

import "./App.css";

function App() {
  // 1. State
  const [statusFilter, setStatusFilter] = useState<InventoryStatus | "all">(
    "all",
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [selectedProduct, setSelectedProduct] =
    useState<EnrichedInventoryItem | null>(null);

  // 2. Productgegevens
  const enrichedItems = enrichInventory(inventory);

  const query = searchTerm.trim().toLowerCase();

  // 3. Filteren
  const filteredItems = enrichedItems.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    const matchesSearch =
      item.product.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.stock - b.stock;
    }
    return b.stock - a.stock;
  });

  function resetFilter() {
    setStatusFilter("all");
    setSearchTerm("");
    setSortOrder("asc");
  }

  return (
    <main>
      <h1> Supply Chain Dashboard</h1>
      <SummaryCards items={enrichedItems} />
      <FilterBar
        value={statusFilter}
        onChange={setStatusFilter}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <button onClick={resetFilter}> Reset</button>

      <InventoryTable
        items={sortedItems}
        onSelectProduct={setSelectedProduct}
        selectedProductId={selectedProduct?.id ?? null}
      />

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}

export default App;
