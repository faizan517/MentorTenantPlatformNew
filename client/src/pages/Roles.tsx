import PermissionMatrix from "@/components/PermissionMatrix";

// TODO: Remove mock data
const roles = ["Super Admin", "Admin", "Manager", "Viewer"];
const permissions = ["Read", "Write", "Delete", "Manage Users", "Manage Billing"];

const initialMatrix = {
  "Super Admin": { Read: true, Write: true, Delete: true, "Manage Users": true, "Manage Billing": true },
  "Admin": { Read: true, Write: true, Delete: true, "Manage Users": true, "Manage Billing": false },
  "Manager": { Read: true, Write: true, Delete: false, "Manage Users": false, "Manage Billing": false },
  "Viewer": { Read: true, Write: false, Delete: false, "Manage Users": false, "Manage Billing": false },
};

export default function Roles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Roles & Permissions</h1>
        <p className="text-muted-foreground mt-1">
          Configure role-based access control
        </p>
      </div>

      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        initialMatrix={initialMatrix}
      />
    </div>
  );
}
