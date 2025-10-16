import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockMetadata = [
  { key: "app.version", value: "2.4.1", type: "String" },
  { key: "max_users_per_tenant", value: "500", type: "Integer" },
  { key: "feature.advanced_analytics", value: "true", type: "Boolean" },
];

export default function MetaData() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Metadata</h1>
          <p className="text-muted-foreground mt-1">
            System configuration and metadata
          </p>
        </div>
        <Button data-testid="button-add-metadata">
          <Plus className="w-4 h-4 mr-2" />
          Add Metadata
        </Button>
      </div>

      <TableWidget
        title="Configuration Values"
        headers={["Key", "Value", "Type"]}
        data={mockMetadata}
        testId="table-metadata"
      />
    </div>
  );
}
