import PermissionMatrix from "../PermissionMatrix";

export default function PermissionMatrixExample() {
  const roles = ["Admin", "Editor", "Viewer"];
  const permissions = ["Read", "Write", "Delete", "Manage"];
  
  const initialMatrix = {
    Admin: { Read: true, Write: true, Delete: true, Manage: true },
    Editor: { Read: true, Write: true, Delete: false, Manage: false },
    Viewer: { Read: true, Write: false, Delete: false, Manage: false },
  };

  return (
    <div className="p-6">
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        initialMatrix={initialMatrix}
      />
    </div>
  );
}
