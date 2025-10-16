import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableWidget from "@/components/TableWidget";

// TODO: Remove mock data
const mockUsers = [
  { name: "John Smith", email: "john@acmecorp.com", role: "Admin", status: "Active" },
  { name: "Sarah Johnson", email: "sarah@techstart.com", role: "Manager", status: "Active" },
  { name: "Mike Davis", email: "mike@healthco.com", role: "Viewer", status: "Inactive" },
];

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage platform users
          </p>
        </div>
        <Button data-testid="button-add-user">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <TableWidget
        title="All Users"
        headers={["Name", "Email", "Role", "Status"]}
        data={mockUsers}
        testId="table-users"
      />
    </div>
  );
}
