import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Plus } from "lucide-react";
import { processors as initialProcessors } from "@/data/processors";

interface Processor {
  id: number;
  name: string;
  bank: string;
  currency: string;
  status: string;
}

export default function Processors() {
  const [processors, setProcessors] = useState<Processor[]>(initialProcessors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bank: "",
    currency: "",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProcessor = {
      id: processors.length + 1,
      ...formData,
    };
    setProcessors([...processors, newProcessor]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      bank: "",
      currency: "",
      status: "Active",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Payment Processors</h1>
          <p className="text-gray-600 mt-1">Manage payment processor configurations</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          data-testid="button-add-processor"
          className="bg-mentor-blue hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Processor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Processors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processors.map((processor) => (
                  <TableRow key={processor.id} data-testid={`row-processor-${processor.id}`}>
                    <TableCell className="font-medium">{processor.name}</TableCell>
                    <TableCell>{processor.bank}</TableCell>
                    <TableCell>{processor.currency}</TableCell>
                    <TableCell>
                      <Badge
                        variant={processor.status === "Active" ? "default" : "secondary"}
                        data-testid={`badge-status-${processor.id}`}
                        className={
                          processor.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        {processor.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onOpenChange={(open: boolean) => {
          setIsModalOpen(open);
          if (!open) {
            setFormData({
              name: "",
              bank: "",
              currency: "",
              status: "Active",
            });
          }
        }}
        title="Add Payment Processor"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              data-testid="input-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="bank">Bank</Label>
            <Input
              id="bank"
              data-testid="input-bank"
              value={formData.bank}
              onChange={(e) =>
                setFormData({ ...formData, bank: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              data-testid="input-currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status" data-testid="select-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active" data-testid="option-active">Active</SelectItem>
                <SelectItem value="Inactive" data-testid="option-inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({
                  name: "",
                  bank: "",
                  currency: "",
                  status: "Active",
                });
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
              Add Processor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
