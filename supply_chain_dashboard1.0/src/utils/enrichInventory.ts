import type { InventoryItem } from "../types/inventory";
import { getInventoryStatus } from "./inventoryStatus";

export function enrichInventory(items: InventoryItem[]) {
  return items.map((item) => {
    const updatedItem = {
      ...item,
      status: getInventoryStatus(item.daysOfStock),
    };
    return updatedItem;
  });
}
