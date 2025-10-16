import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { billingData } from "@/data/billing";

interface BillingEntry {
  month: string;
  amount: number;
  status: string;
}

export default function Billing() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = billingData.filter((entry) =>
    statusFilter === "all" ? true : entry.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Unpaid":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Billing</h1>
        <p className="text-gray-600 mt-1">Track revenue and manage invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={billingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `PKR ${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0048FF"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Billing History</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" data-testid="option-all">All</SelectItem>
                <SelectItem value="Paid" data-testid="option-paid">Paid</SelectItem>
                <SelectItem value="Pending" data-testid="option-pending">Pending</SelectItem>
                <SelectItem value="Unpaid" data-testid="option-unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount (PKR)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((entry, idx) => (
                  <TableRow key={idx} data-testid={`row-billing-${idx}`}>
                    <TableCell className="font-medium">{entry.month}</TableCell>
                    <TableCell>PKR {entry.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(entry.status)}
                        data-testid={`badge-status-${idx}`}
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
