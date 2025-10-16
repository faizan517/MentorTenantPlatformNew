import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockTenants = [
  { name: "Acme Corp", status: "Active", users: 145, plan: "Enterprise" },
  { name: "TechStart Inc", status: "Active", users: 89, plan: "Professional" },
  { name: "HealthCo", status: "Pending", users: 234, plan: "Enterprise" },
  { name: "MediSys", status: "Active", users: 56, plan: "Basic" },
];

export default function Tenants() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Tenant Accounts</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization tenants
          </p>
        </div>
        <Button className="bg-mentor-blue hover:bg-mentor-blue/90" data-testid="button-add-tenant">
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      <TableWidget
        title="All Tenants"
        headers={["Name", "Status", "Users", "Plan"]}
        data={mockTenants}
        testId="table-tenants"
      />
    </div>
  );
}
