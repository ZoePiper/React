export function getInventoryStatus(
  dayOfStock: number,
): "critical" | "warning" | "healthy" {
  if (dayOfStock <= 3) {
    return "critical";
  }
  if (dayOfStock <= 7) {
    return "warning";
  }
  {
    return "healthy";
  }
}
