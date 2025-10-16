import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PermissionMatrixProps {
  roles: string[];
  modules: string[];
  initialPermissions?: Record<string, Record<string, { view: boolean; edit: boolean; delete: boolean }>>;
}

export default function PermissionMatrix({ 
  roles, 
  modules,
  initialPermissions = {}
}: PermissionMatrixProps) {
  const [permissions, setPermissions] = useState<Record<string, Record<string, { view: boolean; edit: boolean; delete: boolean }>>>(
    initialPermissions
  );

  const handleToggle = (role: string, module: string, action: 'view' | 'edit' | 'delete') => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role]?.[module],
          [action]: !prev[role]?.[module]?.[action],
        },
      },
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left text-sm font-medium text-gray-600 pb-4 pr-6 sticky left-0 bg-white">
                  Role / Module
                </th>
                {modules.map((module) => (
                  <th
                    key={module}
                    className="text-left text-sm font-medium text-gray-600 pb-4 px-4 min-w-32"
                  >
                    {module}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role} className="border-t border-gray-200">
                  <td className="py-4 pr-6 text-sm font-medium sticky left-0 bg-white">
                    {role}
                  </td>
                  {modules.map((module) => (
                    <td key={module} className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={permissions[role]?.[module]?.view || false}
                            onCheckedChange={() => handleToggle(role, module, 'view')}
                            data-testid={`checkbox-${role}-${module}-view`}
                          />
                          <span className="text-xs text-gray-600">View</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={permissions[role]?.[module]?.edit || false}
                            onCheckedChange={() => handleToggle(role, module, 'edit')}
                            data-testid={`checkbox-${role}-${module}-edit`}
                          />
                          <span className="text-xs text-gray-600">Edit</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={permissions[role]?.[module]?.delete || false}
                            onCheckedChange={() => handleToggle(role, module, 'delete')}
                            data-testid={`checkbox-${role}-${module}-delete`}
                          />
                          <span className="text-xs text-gray-600">Delete</span>
                        </label>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
