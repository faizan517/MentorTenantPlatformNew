import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Modal from "@/components/Modal";
import { Plus, Search, Sparkles } from "lucide-react";
import {
  geography as initialGeography,
  diagnostics as initialDiagnostics,
  pharmacy as initialPharmacy,
  devices as initialDevices,
  processorsCatalog as initialProcessors,
} from "@/data/metadata";

export default function MetaData() {
  const [activeTab, setActiveTab] = useState("Geography");
  const [geography, setGeography] = useState(initialGeography);
  const [diagnostics, setDiagnostics] = useState(initialDiagnostics);
  const [pharmacy, setPharmacy] = useState(initialPharmacy);
  const [devices, setDevices] = useState(initialDevices);
  const [processors, setProcessors] = useState(initialProcessors);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const tabs = [
    "Geography",
    "Diagnostics",
    "Pharmacy",
    "Devices",
    "Payment Processors",
  ];

  const handleAddClick = () => {
    setFormData({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    switch (activeTab) {
      case "Geography":
        setGeography([...geography, formData]);
        break;
      case "Diagnostics":
        setDiagnostics([...diagnostics, formData]);
        break;
      case "Pharmacy":
        setPharmacy([...pharmacy, formData]);
        break;
      case "Devices":
        setDevices([...devices, formData]);
        break;
      case "Payment Processors":
        setProcessors([...processors, formData]);
        break;
    }
    
    setIsModalOpen(false);
    setFormData({});
  };

  const getFilteredData = () => {
    let data: any[] = [];
    
    switch (activeTab) {
      case "Geography":
        data = geography;
        break;
      case "Diagnostics":
        data = diagnostics;
        break;
      case "Pharmacy":
        data = pharmacy;
        break;
      case "Devices":
        data = devices;
        break;
      case "Payment Processors":
        data = processors;
        break;
    }

    if (!searchQuery) return data;

    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const renderTable = () => {
    const filteredData = getFilteredData();

    switch (activeTab) {
      case "Geography":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "Diagnostics":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "Pharmacy":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "Devices":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Function</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.function}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "Payment Processors":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
  };

  const renderModalFields = () => {
    switch (activeTab) {
      case "Geography":
        return (
          <>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                data-testid="input-country"
                value={formData.country || ""}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                data-testid="input-city"
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </>
        );

      case "Diagnostics":
        return (
          <>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                data-testid="input-code"
                value={formData.code || ""}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                data-testid="input-name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </>
        );

      case "Pharmacy":
        return (
          <>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                data-testid="input-sku"
                value={formData.sku || ""}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                data-testid="input-name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </>
        );

      case "Devices":
        return (
          <>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                data-testid="input-brand"
                value={formData.brand || ""}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="function">Function</Label>
              <Input
                id="function"
                data-testid="input-function"
                value={formData.function || ""}
                onChange={(e) =>
                  setFormData({ ...formData, function: e.target.value })
                }
              />
            </div>
          </>
        );

      case "Payment Processors":
        return (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              data-testid="input-name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Meta Data</h1>
        <p className="text-gray-600 mt-1">Manage your code libraries and catalogs</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="rounded-xl">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tab}</CardTitle>
                  <Button
                    onClick={handleAddClick}
                    data-testid="button-add"
                    className="bg-mentor-blue hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {tab === "Geography" ? "Location" : tab === "Payment Processors" ? "Processor" : "Item"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={`Search ${tab.toLowerCase()}...`}
                      data-testid="input-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-xs px-2 py-1"
                    data-testid="badge-ai-hint"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI-hint
                  </Badge>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  {renderTable()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Modal
        open={isModalOpen}
        onOpenChange={(open: boolean) => {
          setIsModalOpen(open);
          if (!open) setFormData({});
        }}
        title={`Add ${activeTab === "Geography" ? "Location" : activeTab === "Payment Processors" ? "Processor" : "Item"}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderModalFields()}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({});
              }}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="button-submit"
              className="bg-mentor-blue hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
