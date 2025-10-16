import StatCard from "../StatCard";
import { Users } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <StatCard
        title="Total Users"
        value="2,543"
        icon={Users}
        trend={{ value: 12.5, isPositive: true }}
        testId="card-stat-users"
      />
    </div>
  );
}
