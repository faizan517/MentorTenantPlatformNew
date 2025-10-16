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
    <Card data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`${testId}-value`}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3 text-success" />
            ) : (
              <TrendingDown className="w-3 h-3 text-error" />
            )}
            <span className={`text-xs ${trend.isPositive ? "text-success" : "text-error"}`}>
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
