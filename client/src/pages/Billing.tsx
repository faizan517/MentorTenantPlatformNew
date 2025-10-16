import { DollarSign, CreditCard, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockBillingStats = [
  { title: "Total Revenue", value: "$48.2K", icon: DollarSign, trend: { value: 12.3, isPositive: true } },
  { title: "Active Subscriptions", value: "48", icon: CreditCard, trend: { value: 8.5, isPositive: true } },
  { title: "Average MRR", value: "$1,004", icon: TrendingUp, trend: { value: 5.2, isPositive: true } },
];

const mockInvoices = [
  { invoice_id: "INV-001", tenant: "Acme Corp", amount: "$12,500", status: "Paid", date: "Oct 1, 2024" },
  { invoice_id: "INV-002", tenant: "TechStart Inc", amount: "$5,200", status: "Paid", date: "Oct 1, 2024" },
  { invoice_id: "INV-003", tenant: "HealthCo", amount: "$18,900", status: "Pending", date: "Oct 1, 2024" },
];

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Track revenue and manage invoices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockBillingStats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            testId={`card-billing-${idx}`}
          />
        ))}
      </div>

      <TableWidget
        title="Recent Invoices"
        headers={["Invoice_id", "Tenant", "Amount", "Status", "Date"]}
        data={mockInvoices}
        testId="table-invoices"
      />
    </div>
  );
}
