import type { EnrichedInventoryItem } from "../types/inventory";
import SummaryCard from "./SummaryCard";
import "./SummaryCards.css";

interface SummaryCardsProps {
  items: EnrichedInventoryItem[];
}

export default function SummaryCards({ items }: SummaryCardsProps) {
  const total = items.length;

  const counts = items.reduce(
    (first, item) => {
      if (item.status === "healthy") {
        first.healthy++;
      }
      if (item.status === "warning") {
        first.warning++;
      }
      if (item.status === "critical") {
        first.critical++;
      }
      return first;
    },
    { healthy: 0, warning: 0, critical: 0 },
  );

  return (
    <section>
      <h2> Inventory Overview</h2>

      <div className="summary-grid">
        <SummaryCard title="Total Products" value={total} />

        <SummaryCard title="Healthy" value={counts.healthy} variant="healthy" />

        <SummaryCard title="Warning" value={counts.warning} variant="warning" />

        <SummaryCard
          title="Critical"
          value={counts.critical}
          variant="critical"
        />
      </div>
    </section>
  );
}
