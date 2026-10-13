import type { InventoryStatus } from "../types/inventory";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: InventoryStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge ${status}`}>{status}</span>;
}
