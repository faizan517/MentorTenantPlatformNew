import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockDevices = [
  { device_id: "DEV-001", tenant: "Acme Corp", type: "Mobile", last_active: "5 min ago" },
  { device_id: "DEV-002", tenant: "TechStart Inc", type: "Desktop", last_active: "1 hour ago" },
  { device_id: "DEV-003", tenant: "HealthCo", type: "Tablet", last_active: "2 days ago" },
];

export default function Devices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Devices</h1>
          <p className="text-muted-foreground mt-1">
            Manage connected devices
          </p>
        </div>
        <Button data-testid="button-add-device">
          <Plus className="w-4 h-4 mr-2" />
          Register Device
        </Button>
      </div>

      <TableWidget
        title="Registered Devices"
        headers={["Device_id", "Tenant", "Type", "Last_active"]}
        data={mockDevices}
        testId="table-devices"
      />
    </div>
  );
}
