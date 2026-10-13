export type InventoryStatus = "critical" | "warning" | "healthy";

export type EnrichedInventoryItem = InventoryItem & {
  status: InventoryStatus;
};
export interface InventoryItem {
  id: number;
  product: string;
  sku: string;
  category: "Petcare" | "Snacking" | "Food";
  stock: number;
  demand: number;
  daysOfStock: number;
}
