import { Building2, Users, Key, CreditCard } from "lucide-react";
import StatCard from "@/components/StatCard";
import TableWidget from "@/components/TableWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// TODO: Remove mock data
const mockStats = [
  { title: "Total Tenants", value: "48", icon: Building2, trend: { value: 8.3, isPositive: true } },
  { title: "Active Users", value: "2,543", icon: Users, trend: { value: 12.5, isPositive: true } },
  { title: "Active Licenses", value: "156", icon: Key, trend: { value: 5.2, isPositive: true } },
  { title: "Monthly Revenue", value: "$48.2K", icon: CreditCard, trend: { value: 3.1, isPositive: false } },
];

const mockChartData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1400 },
  { month: "Mar", users: 1800 },
  { month: "Apr", users: 2100 },
  { month: "May", users: 2300 },
  { month: "Jun", users: 2543 },
];

const mockRecentActivity = [
  { tenant: "Acme Corp", action: "License renewed", time: "2 hours ago" },
  { tenant: "TechStart Inc", action: "New device added", time: "5 hours ago" },
  { tenant: "HealthCo", action: "User invited", time: "1 day ago" },
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
        {mockStats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            testId={`card-stat-${idx}`}
          />
        ))}
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
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
              <Line
                type="monotone"
                dataKey="users"
                stroke="#0048FF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <TableWidget
        title="Recent Activity"
        headers={["Tenant", "Action", "Time"]}
        data={mockRecentActivity}
        testId="table-activity"
      />
    </div>
  );
}
