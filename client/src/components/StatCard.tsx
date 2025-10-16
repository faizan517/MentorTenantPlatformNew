import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  testId?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, testId }: StatCardProps) {
  return (
    <Card className="rounded-xl shadow-sm" data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-gray-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`${testId}-value`}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3 text-mentor-green" />
            ) : (
              <TrendingDown className="w-3 h-3 text-mentor-red" />
            )}
            <span className={`text-xs ${trend.isPositive ? "text-mentor-green" : "text-mentor-red"}`}>
              {trend.value}%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
