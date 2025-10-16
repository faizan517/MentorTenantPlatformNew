import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockLicenses = [
  { key: "LIC-2024-001", tenant: "Acme Corp", type: "Enterprise", expires: "Dec 31, 2024" },
  { key: "LIC-2024-002", tenant: "TechStart Inc", type: "Professional", expires: "Nov 15, 2024" },
  { key: "LIC-2024-003", tenant: "HealthCo", type: "Enterprise", expires: "Jan 20, 2025" },
];

export default function Licenses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Licenses</h1>
          <p className="text-muted-foreground mt-1">
            Manage platform licenses
          </p>
        </div>
        <Button data-testid="button-add-license">
          <Plus className="w-4 h-4 mr-2" />
          Add License
        </Button>
      </div>

      <TableWidget
        title="Active Licenses"
        headers={["Key", "Tenant", "Type", "Expires"]}
        data={mockLicenses}
        testId="table-licenses"
      />
    </div>
  );
}
