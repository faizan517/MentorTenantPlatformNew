import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter, Bell, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { auditLogs, type AuditLog } from "@/data/auditLogs";
import { notifications } from "@/data/notifications";

export default function AuditLogs() {
  const [dateFilter, setDateFilter] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");

  // Get unique users and modules for filter dropdowns
  const uniqueUsers = useMemo(() => {
    const users: string[] = [];
    const seen = new Set<string>();
    auditLogs.forEach((log) => {
      if (!seen.has(log.user)) {
        seen.add(log.user);
        users.push(log.user);
      }
    });
    return users.sort();
  }, []);

  const uniqueModules = useMemo(() => {
    const modules: string[] = [];
    const seen = new Set<string>();
    auditLogs.forEach((log) => {
      if (!seen.has(log.module)) {
        seen.add(log.module);
        modules.push(log.module);
      }
    });
    return modules.sort();
  }, []);

  // Filter logs based on selected filters
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesDate = !dateFilter || log.timestamp.includes(dateFilter);
      const matchesUser = userFilter === "all" || log.user === userFilter;
      const matchesModule =
        moduleFilter === "all" || log.module === moduleFilter;
      return matchesDate && matchesUser && matchesModule;
    });
  }, [dateFilter, userFilter, moduleFilter]);

  const clearFilters = () => {
    setDateFilter("");
    setUserFilter("all");
    setModuleFilter("all");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Success: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      <Badge
        className={
          variants[status as keyof typeof variants] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {status}
      </Badge>
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-mentor-black">Audit Logs</h1>
            <p className="text-gray-600 mt-1">
              Track system activities and user actions
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-filter">Date</Label>
                <Input
                  id="date-filter"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  data-testid="input-date-filter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-filter">User</Label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger data-testid="select-user-filter">
                    <SelectValue placeholder="All users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All users</SelectItem>
                    {uniqueUsers.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="module-filter">Module</Label>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger data-testid="select-module-filter">
                    <SelectValue placeholder="All modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All modules</SelectItem>
                    {uniqueModules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  data-testid="button-clear-filters"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Activity Log ({filteredLogs.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} data-testid={`audit-log-${log.id}`}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.module}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Panel */}
      {/* <div className="w-80 space-y-4">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 6).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${getNotificationBg(
                  notification.type
                )} ${!notification.read ? "border-l-4" : ""}`}
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-start gap-2">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-mentor-blue rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              className="w-full text-mentor-blue hover:bg-mentor-blue/10"
              data-testid="button-view-all-notifications"
            >
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
