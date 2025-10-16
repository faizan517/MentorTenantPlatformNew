import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { users as initialUsers } from "@/data/users";

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "Support",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      role: "Support",
      status: "Active",
    });
  };

  const handleStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Internal Users</h1>
          <p className="text-gray-600 mt-1">Manage platform administrators and staff</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          data-testid="button-add-user"
          className="bg-mentor-blue hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={user.status === "Active"}
                          onCheckedChange={() => handleStatusToggle(user.id)}
                          data-testid={`toggle-status-${user.id}`}
                        />
                        <span className="text-sm text-gray-600">
                          {user.status}
                        </span>
                      </div>
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
              email: "",
              mobile: "",
              role: "Support",
              status: "Active",
            });
          }
        }}
        title="Add User"
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              data-testid="input-email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              data-testid="input-mobile"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              placeholder="+92-300-1234567"
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger id="role" data-testid="select-role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Super Admin" data-testid="option-super-admin">Super Admin</SelectItem>
                <SelectItem value="Ops" data-testid="option-ops">Ops</SelectItem>
                <SelectItem value="Finance" data-testid="option-finance">Finance</SelectItem>
                <SelectItem value="Support" data-testid="option-support">Support</SelectItem>
              </SelectContent>
            </Select>
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
                  email: "",
                  mobile: "",
                  role: "Support",
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
              Add User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
