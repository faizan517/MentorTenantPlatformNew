import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Modal from "@/components/Modal";
import { Plus, Edit, Settings } from "lucide-react";
import { licenseTiers } from "@/data/licenses";
import LicenseManagerUI from "./LicenseManagerUI";

interface Package {
  id: string;
  name: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

export default function Licenses() {
  const [packages, setPackages] = useState<Package[]>(licenseTiers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    features: "",
    monthlyPrice: "",
    yearlyPrice: "",
  });

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      features: pkg.features.join("\n"),
      monthlyPrice: pkg.monthlyPrice.toString(),
      yearlyPrice: pkg.yearlyPrice.toString(),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageData = {
      id: editingPackage?.id || Date.now().toString(),
      name: formData.name,
      features: formData.features.split("\n").filter((f) => f.trim()),
      monthlyPrice: parseInt(formData.monthlyPrice),
      yearlyPrice: parseInt(formData.yearlyPrice),
    };

    if (editingPackage) {
      setPackages(packages.map((p) => (p.id === editingPackage.id ? packageData : p)));
    } else {
      setPackages([...packages, packageData]);
    }

    setIsModalOpen(false);
    setEditingPackage(null);
    setFormData({ name: "", features: "", monthlyPrice: "", yearlyPrice: "" });
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    setFormData({ name: "", features: "", monthlyPrice: "", yearlyPrice: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">License Management</h1>
          <p className="text-gray-600 mt-1">Manage license packages and policies</p>
        </div>
      </div>

      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="packages">License Packages</TabsTrigger>
          <TabsTrigger value="manager">Policy Manager</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packages" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-mentor-black">License Packages</h2>
              <p className="text-gray-600 text-sm">Manage platform license tiers</p>
            </div>
            <Button
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              onClick={handleAddNew}
              data-testid="button-add-package"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Package
            </Button>
          </div>

          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>All Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Monthly Price</TableHead>
                    <TableHead>Yearly Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {pkg.features.slice(0, 2).join(", ")}
                          {pkg.features.length > 2 && ` +${pkg.features.length - 2} more`}
                        </div>
                      </TableCell>
                      <TableCell>PKR {pkg.monthlyPrice.toLocaleString()}</TableCell>
                      <TableCell>PKR {pkg.yearlyPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(pkg)}
                          data-testid={`button-edit-${pkg.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manager">
          <LicenseManagerUI />
        </TabsContent>
      </Tabs>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingPackage ? "Edit Package" : "Add New Package"}
        description={
          editingPackage
            ? "Update package details"
            : "Create a new license package"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pkg-name">Package Name</Label>
            <Input
              id="pkg-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="input-package-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              required
              rows={6}
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              data-testid="textarea-features"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Price (PKR)</Label>
              <Input
                id="monthly"
                type="number"
                required
                value={formData.monthlyPrice}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyPrice: e.target.value })
                }
                data-testid="input-monthly-price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearly">Yearly Price (PKR)</Label>
              <Input
                id="yearly"
                type="number"
                required
                value={formData.yearlyPrice}
                onChange={(e) =>
                  setFormData({ ...formData, yearlyPrice: e.target.value })
                }
                data-testid="input-yearly-price"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              data-testid="button-cancel-package"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              data-testid="button-submit-package"
            >
              {editingPackage ? "Update" : "Create"} Package
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
