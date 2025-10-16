import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tabs from "@/components/Tabs";
import Modal from "@/components/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Calendar, DollarSign, Plus, Image } from "lucide-react";
import { tenants as initialTenants } from "@/data/tenants";
import { useAppStore } from "@/store/useAppStore";

export default function TenantProfile() {
  const [, params] = useRoute("/tenant/:id");
  const { tenants: storeTenants } = useAppStore();
  const [tenant, setTenant] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [services, setServices] = useState({
    EMR: true,
    Billing: true,
    POS: false,
    Teleconsult: true,
    Pharmacy: false,
    Insurance: false,
    HomeCare: false,
    Lab: true,
  });

  useEffect(() => {
    const allTenants = [...initialTenants, ...storeTenants];
    const foundTenant = allTenants.find((t) => t.id === params?.id);
    setTenant(foundTenant);
  }, [params, storeTenants]);

  if (!tenant) {
    return <div className="p-6">Tenant not found</div>;
  }

  const users = [
    { name: "Dr. Ahmed Khan", role: "Admin", email: "ahmed@hospital.com", status: "Active" },
    { name: "Sarah Ali", role: "Doctor", email: "sarah@hospital.com", status: "Active" },
    { name: "Bilal Hassan", role: "Receptionist", email: "bilal@hospital.com", status: "Inactive" },
  ];

  const billingData = [
    { month: "October 2024", amount: "PKR 150,000", status: "Paid" },
    { month: "September 2024", amount: "PKR 150,000", status: "Paid" },
    { month: "August 2024", amount: "PKR 150,000", status: "Paid" },
  ];

  const processors = [
    { name: "JazzCash", status: "Active" },
    { name: "EasyPaisa", status: "Active" },
    { name: "Bank Transfer", status: "Inactive" },
  ];

  const devices = [
    { name: "ECG Monitor", enabled: true },
    { name: "Blood Pressure Monitor", enabled: true },
    { name: "Glucometer", enabled: false },
    { name: "Pulse Oximeter", enabled: true },
  ];

  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-mentor-black">{tenant.name}</h2>
                  <p className="text-gray-600">{tenant.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-600">Geography</p>
                  <p className="font-medium">{tenant.geography}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={tenant.status === "Active" ? "bg-mentor-green" : "bg-gray-500"}>
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "license",
      label: "License Info",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>License Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">License Type</p>
                <p className="text-xl font-bold text-mentor-blue">{tenant.license}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className="bg-mentor-green">Active</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium">{tenant.activationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiry Date</p>
                <p className="font-medium">{tenant.expiryDate}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Label htmlFor="auto-renew">Auto-Renew</Label>
                <p className="text-sm text-gray-600">Automatically renew license on expiry</p>
              </div>
              <Switch
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
                data-testid="switch-auto-renew"
              />
            </div>
            <div className="pt-2">
              <Label>Renewal Reminders</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">30 days before expiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">7 days before expiry</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "users",
      label: "Users",
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              onClick={() => setIsUserModalOpen(true)}
              data-testid="button-add-user"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
          <Card className="rounded-xl shadow-sm">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={user.status === "Active" ? "bg-mentor-green" : "bg-gray-500"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "services",
      label: "Services",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Enabled Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(services).map(([service, enabled]) => (
                <div key={service} className="flex items-center justify-between">
                  <Label htmlFor={service}>{service}</Label>
                  <Switch
                    id={service}
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      setServices({ ...services, [service]: checked })
                    }
                    data-testid={`switch-service-${service.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "metadata",
      label: "Meta Data",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Code Library Assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">ICD-10 Enabled</p>
                <p className="font-medium">Yes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CPT Codes</p>
                <p className="font-medium">Yes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SNOMED CT</p>
                <p className="font-medium">No</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">LOINC</p>
                <p className="font-medium">Yes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "processors",
      label: "Payment Processors",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Linked Payment Processors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Processor Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processors.map((processor, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{processor.name}</TableCell>
                    <TableCell>
                      <Badge className={processor.status === "Active" ? "bg-mentor-green" : "bg-gray-500"}>
                        {processor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "devices",
      label: "Devices",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Medical Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <Label>{device.name}</Label>
                  <Switch
                    checked={device.enabled}
                    data-testid={`switch-device-${idx}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      value: "billing",
      label: "Billing",
      content: (
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingData.map((bill, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{bill.month}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-mentor-green">{bill.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">{tenant.name}</h1>
          <p className="text-gray-600 mt-1">{tenant.type} - {tenant.geography}</p>
        </div>
        <Button variant="outline" data-testid="button-edit-tenant">
          Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="overview" tabs={tabs} />

      <Modal
        open={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
        title="Add New User"
        description="Add a new user to this tenant"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" data-testid="input-user-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-role">Role</Label>
            <Input id="user-role" data-testid="input-user-role" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" type="email" data-testid="input-user-email" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUserModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              data-testid="button-submit-user"
            >
              Add User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
