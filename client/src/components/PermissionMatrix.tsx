import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PermissionMatrixProps {
  roles: string[];
  permissions: string[];
  initialMatrix?: Record<string, Record<string, boolean>>;
}

export default function PermissionMatrix({ 
  roles, 
  permissions,
  initialMatrix = {}
}: PermissionMatrixProps) {
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>(
    initialMatrix
  );

  const handleToggle = (role: string, permission: string) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role]?.[permission],
      },
    }));
    console.log(`Permission ${permission} for ${role} toggled`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground pb-4 pr-8">
                  Role / Permission
                </th>
                {permissions.map((permission) => (
                  <th
                    key={permission}
                    className="text-left text-sm font-medium text-muted-foreground pb-4 px-4"
                  >
                    {permission}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role} className="border-t border-border">
                  <td className="py-4 pr-8 text-sm font-medium">{role}</td>
                  {permissions.map((permission) => (
                    <td key={permission} className="py-4 px-4">
                      <Checkbox
                        checked={matrix[role]?.[permission] || false}
                        onCheckedChange={() => handleToggle(role, permission)}
                        data-testid={`checkbox-${role}-${permission}`}
                      />
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
