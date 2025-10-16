import PermissionMatrix from "@/components/PermissionMatrix";

const roles = ["Super Admin", "Ops", "Finance", "Support"];
const modules = [
  "Tenants",
  "Licenses",
  "MetaData",
  "Processors",
  "Devices",
  "Billing",
  "Users",
  "Settings"
];

const initialPermissions = {
  "Super Admin": {
    Tenants: { view: true, edit: true, delete: true },
    Licenses: { view: true, edit: true, delete: true },
    MetaData: { view: true, edit: true, delete: true },
    Processors: { view: true, edit: true, delete: true },
    Devices: { view: true, edit: true, delete: true },
    Billing: { view: true, edit: true, delete: true },
    Users: { view: true, edit: true, delete: true },
    Settings: { view: true, edit: true, delete: true },
  },
  "Ops": {
    Tenants: { view: true, edit: true, delete: false },
    Licenses: { view: true, edit: true, delete: false },
    MetaData: { view: true, edit: true, delete: false },
    Processors: { view: true, edit: false, delete: false },
    Devices: { view: true, edit: true, delete: false },
    Billing: { view: true, edit: false, delete: false },
    Users: { view: true, edit: false, delete: false },
    Settings: { view: true, edit: false, delete: false },
  },
  "Finance": {
    Tenants: { view: true, edit: false, delete: false },
    Licenses: { view: true, edit: false, delete: false },
    MetaData: { view: false, edit: false, delete: false },
    Processors: { view: true, edit: true, delete: false },
    Devices: { view: false, edit: false, delete: false },
    Billing: { view: true, edit: true, delete: false },
    Users: { view: false, edit: false, delete: false },
    Settings: { view: false, edit: false, delete: false },
  },
  "Support": {
    Tenants: { view: true, edit: false, delete: false },
    Licenses: { view: true, edit: false, delete: false },
    MetaData: { view: true, edit: false, delete: false },
    Processors: { view: true, edit: false, delete: false },
    Devices: { view: true, edit: false, delete: false },
    Billing: { view: true, edit: false, delete: false },
    Users: { view: true, edit: false, delete: false },
    Settings: { view: false, edit: false, delete: false },
  },
};

export default function Roles() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Roles & Rights</h1>
        <p className="text-gray-600 mt-1">
          Configure role-based access control and permissions
        </p>
      </div>

      <PermissionMatrix
        roles={roles}
        modules={modules}
        initialPermissions={initialPermissions}
      />
    </div>
  );
}
