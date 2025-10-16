import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/Modal";
import { Plus, Search } from "lucide-react";
import { tenants as initialTenants } from "@/data/tenants";
import { useAppStore } from "@/store/useAppStore";

export default function Tenants() {
  const [, setLocation] = useLocation();
  const { tenants: storeTenants, addTenant } = useAppStore();
  const [allTenants, setAllTenants] = useState([...initialTenants]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    geography: "",
    license: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setAllTenants([...initialTenants, ...storeTenants]);
  }, [storeTenants]);

  const filteredTenants = allTenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTenant = {
      name: formData.name,
      type: formData.type,
      license: formData.license,
      status: "Active",
      geography: formData.geography,
      activationDate: formData.startDate,
      expiryDate: formData.endDate,
    };
    addTenant(newTenant);
    setIsModalOpen(false);
    setFormData({
      name: "",
      type: "",
      geography: "",
      license: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Tenant Accounts</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization tenants
          </p>
        </div>
        <Button
          className="bg-mentor-blue hover:bg-mentor-blue/90"
          onClick={() => setIsModalOpen(true)}
          data-testid="button-add-tenant"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-tenant"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Geography</TableHead>
                <TableHead>Activation</TableHead>
                <TableHead>Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow
                  key={tenant.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setLocation(`/tenant/${tenant.id}`)}
                  data-testid={`row-tenant-${tenant.id}`}
                >
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.type}</TableCell>
                  <TableCell>{tenant.license}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tenant.status === "Active"
                          ? "bg-mentor-green/10 text-mentor-green"
                          : tenant.status === "Pending"
                          ? "bg-mentor-orange/10 text-mentor-orange"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </TableCell>
                  <TableCell>{tenant.geography}</TableCell>
                  <TableCell>{tenant.activationDate}</TableCell>
                  <TableCell>{tenant.expiryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add New Tenant"
        description="Enter tenant details to create a new account"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tenant Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="input-tenant-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger data-testid="select-tenant-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospital">Hospital</SelectItem>
                <SelectItem value="Clinic">Clinic</SelectItem>
                <SelectItem value="Diagnostic Center">Diagnostic Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="geography">Geography</Label>
            <Input
              id="geography"
              required
              value={formData.geography}
              onChange={(e) => setFormData({ ...formData, geography: e.target.value })}
              data-testid="input-tenant-geography"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">License</Label>
            <Select
              value={formData.license}
              onValueChange={(value) => setFormData({ ...formData, license: value })}
            >
              <SelectTrigger data-testid="select-tenant-license">
                <SelectValue placeholder="Select license" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                data-testid="input-start-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                data-testid="input-end-date"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              data-testid="button-submit-tenant"
            >
              Add Tenant
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
