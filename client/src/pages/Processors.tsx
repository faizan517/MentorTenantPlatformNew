import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";
import { Badge } from "@/components/ui/badge";

// TODO: Remove mock data
const mockProcessors = [
  { name: "Payment Processor", status: "Active", last_run: "2 min ago" },
  { name: "Data Sync", status: "Active", last_run: "15 min ago" },
  { name: "Report Generator", status: "Idle", last_run: "3 hours ago" },
];

export default function Processors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Processors</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage background processors
          </p>
        </div>
        <Button data-testid="button-add-processor">
          <Plus className="w-4 h-4 mr-2" />
          Add Processor
        </Button>
      </div>

      <TableWidget
        title="Active Processors"
        headers={["Name", "Status", "Last_run"]}
        data={mockProcessors}
        testId="table-processors"
      />
    </div>
  );
}
