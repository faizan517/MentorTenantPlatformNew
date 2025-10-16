import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/Modal";
import { Activity } from "lucide-react";
import { devices as initialDevices } from "@/data/devices";
import { tenants } from "@/data/tenants";

interface Device {
  brand: string;
  functions: string;
}

export default function Devices() {
  const [devices] = useState<Device[]>(initialDevices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);

  const handleAssignClick = (device: Device) => {
    setSelectedDevice(device);
    setSelectedTenants([]);
    setIsModalOpen(true);
  };

  const handleTenantToggle = (tenantName: string) => {
    setSelectedTenants((prev) =>
      prev.includes(tenantName)
        ? prev.filter((t) => t !== tenantName)
        : [...prev, tenantName]
    );
  };

  const handleAssign = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
    setSelectedTenants([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Medical Devices</h1>
        <p className="text-gray-600 mt-1">Manage medical device catalog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device, idx) => (
          <Card key={idx} data-testid={`card-device-${idx}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{device.brand}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="mt-2 text-xs"
                    data-testid={`badge-certification-${idx}`}
                  >
                    FDA/CE
                  </Badge>
                </div>
                <Activity className="w-5 h-5 text-mentor-blue" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Functions</p>
                <p className="text-sm text-gray-900">{device.functions}</p>
              </div>
              <Button
                onClick={() => handleAssignClick(device)}
                data-testid={`button-assign-${idx}`}
                className="w-full bg-mentor-blue hover:bg-blue-700"
              >
                Assign to Tenant
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={(open: boolean) => {
          setIsModalOpen(open);
          if (!open) {
            setSelectedDevice(null);
            setSelectedTenants([]);
          }
        }}
        title={`Assign ${selectedDevice?.brand || "Device"} to Tenants`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select tenants to assign this device to
          </p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tenants.map((tenant) => (
              <div
                key={tenant.name}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                data-testid={`tenant-option-${tenant.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Checkbox
                  id={tenant.name}
                  checked={selectedTenants.includes(tenant.name)}
                  onCheckedChange={() => handleTenantToggle(tenant.name)}
                  data-testid={`checkbox-${tenant.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
                <label
                  htmlFor={tenant.name}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-medium text-sm">{tenant.name}</p>
                  <p className="text-xs text-gray-500">
                    {tenant.type} • {tenant.geography}
                  </p>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedDevice(null);
                setSelectedTenants([]);
              }}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              data-testid="button-confirm-assign"
              className="bg-mentor-blue hover:bg-blue-700"
            >
              Assign ({selectedTenants.length})
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
