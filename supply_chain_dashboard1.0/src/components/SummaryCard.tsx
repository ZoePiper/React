interface SummaryCardProps {
  title: string;
  value: number;
  variant?: "critical" | "warning" | "healthy";
}

export default function SummaryCard({
  title,
  value,
  variant,
}: SummaryCardProps) {
  return (
    <div className={`summary-card ${variant ?? ""}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
