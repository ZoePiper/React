import type { InventoryItem } from "../types/inventory";

export const inventory: InventoryItem[] = [
  {
    id: 1,
    product: "M&M's",
    sku: "MM-001",
    category: "Snacking",
    stock: 120,
    demand: 40,
    daysOfStock: 3,
  },
  {
    id: 2,
    product: "Wiskas",
    sku: "WH-001",
    category: "Petcare",
    stock: 300,
    demand: 50,
    daysOfStock: 6,
  },
  {
    id: 3,
    product: "Pedegree",
    sku: "PD-001",
    category: "Petcare",
    stock: 900,
    demand: 70,
    daysOfStock: 13,
  },
  {
    id: 4,
    product: "Treets",
    sku: "TR-001",
    category: "Snacking",
    stock: 1980,
    demand: 15,
    daysOfStock: 4,
  },
  {
    id: 5,
    product: "Dolmio",
    sku: "DL-001",
    category: "Food",
    stock: 22,
    demand: 2,
    daysOfStock: 5,
  },
];
