import { Building2, Key, Banknote, CreditCard } from "lucide-react";
import StatCard from "@/components/StatCard";
import TableWidget from "@/components/TableWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpiData = [
  { title: "Active Tenants", value: "18", icon: Building2 },
  { title: "Licenses Active", value: "47", icon: Key },
  { title: "Total Revenue", value: "PKR 18,200,000", icon: Banknote },
  { title: "Payment Processors", value: "3", icon: CreditCard },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1350000 },
  { month: "Mar", revenue: 1500000 },
  { month: "Apr", revenue: 1450000 },
  { month: "May", revenue: 1600000 },
  { month: "Jun", revenue: 1550000 },
  { month: "Jul", revenue: 1700000 },
  { month: "Aug", revenue: 1650000 },
  { month: "Sep", revenue: 1800000 },
  { month: "Oct", revenue: 1750000 },
  { month: "Nov", revenue: 1900000 },
  { month: "Dec", revenue: 1850000 },
];

const monthlyBillingData = [
  { month: "Jan", bills: 45 },
  { month: "Feb", bills: 52 },
  { month: "Mar", bills: 48 },
  { month: "Apr", bills: 61 },
  { month: "May", bills: 55 },
  { month: "Jun", bills: 67 },
  { month: "Jul", bills: 70 },
  { month: "Aug", bills: 65 },
  { month: "Sep", bills: 72 },
  { month: "Oct", bills: 68 },
  { month: "Nov", bills: 75 },
  { month: "Dec", bills: 80 },
];

const recentActivity = [
  { activity: "Tenant onboarded", details: "Shifa International Hospital", time: "2 hours ago" },
  { activity: "License renewed", details: "HealthBridge Clinic - Pro", time: "5 hours ago" },
  { activity: "Payment posted", details: "PKR 150,000 - MediCare Plus", time: "1 day ago" },
  { activity: "Tenant onboarded", details: "Global Health Institute", time: "2 days ago" },
  { activity: "License renewed", details: "CityMed Clinic - Pro", time: "3 days ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor your platform's key metrics and activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <StatCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            testId={`card-stat-${idx}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => `PKR ${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0048FF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Billing Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyBillingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="bills" fill="#6BDFAB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <TableWidget
        title="Recent Activity"
        headers={["Activity", "Details", "Time"]}
        data={recentActivity}
        testId="table-activity"
      />
    </div>
  );
}
