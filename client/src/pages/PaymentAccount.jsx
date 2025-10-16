import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/Modal";
import StatCard from "@/components/StatCard";
import { Plus, Search, CreditCard, Link, DollarSign } from "lucide-react";
import { paymentAccounts as initialAccounts } from "@/data/paymentAccounts";

export default function PaymentAccount() {
  const [allAccounts, setAllAccounts] = useState([...initialAccounts]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountName: "",
    bank: "",
    branch: "",
    iban: "",
    currency: "",
    gatewayLinked: "",
    status: "Active",
    notes: "",
  });

  const filteredAccounts = allAccounts.filter((account) => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         account.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      id: (allAccounts.length + 1).toString(),
      ...formData,
    };
    setAllAccounts([...allAccounts, newAccount]);
    setIsModalOpen(false);
    setFormData({
      accountName: "",
      bank: "",
      branch: "",
      iban: "",
      currency: "",
      gatewayLinked: "",
      status: "Active",
      notes: "",
    });
  };

  // Calculate summary statistics
  const totalAccounts = allAccounts.length;
  const linkedGateways = [...new Set(allAccounts.map(acc => acc.gatewayLinked))].length;
  const defaultCurrency = allAccounts.find(acc => acc.status === "Active")?.currency || "PKR";

  const getStatusBadge = (status) => {
    return (
      <Badge 
        className={
          status === "Active" 
            ? "bg-mentor-green/10 text-mentor-green hover:bg-mentor-green/20" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
        variant="secondary"
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Payment Accounts</h1>
          <p className="text-gray-600 mt-1">
            Manage Mentor Health's payment accounts
          </p>
        </div>
        <Button
          className="bg-mentor-blue hover:bg-mentor-blue/90"
          onClick={() => setIsModalOpen(true)}
          data-testid="button-add-account"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Accounts"
          value={totalAccounts}
          icon={CreditCard}
          testId="stat-total-accounts"
        />
        <StatCard
          title="Linked Gateways"
          value={linkedGateways}
          icon={Link}
          testId="stat-linked-gateways"
        />
        <StatCard
          title="Default Currency"
          value={defaultCurrency}
          icon={DollarSign}
          testId="stat-default-currency"
        />
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by account name or bank..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-account"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>IBAN</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Gateway Linked</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow
                  key={account.id}
                  className="cursor-pointer hover:bg-gray-50"
                  data-testid={`row-account-${account.id}`}
                >
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>{account.bank}</TableCell>
                  <TableCell>{account.branch}</TableCell>
                  <TableCell className="font-mono text-sm">{account.iban}</TableCell>
                  <TableCell>{account.currency}</TableCell>
                  <TableCell>{account.gatewayLinked}</TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add New Payment Account"
        description="Enter payment account details to create a new account"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              required
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              data-testid="input-account-name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Bank</Label>
              <Input
                id="bank"
                required
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                data-testid="input-bank"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                required
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                data-testid="input-branch"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iban">IBAN</Label>
            <Input
              id="iban"
              required
              value={formData.iban}
              onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
              data-testid="input-iban"
              placeholder="PK36HABB0023456789012345"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger data-testid="select-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKR">PKR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gatewayLinked">Gateway Linked</Label>
              <Select
                value={formData.gatewayLinked}
                onValueChange={(value) => setFormData({ ...formData, gatewayLinked: value })}
              >
                <SelectTrigger data-testid="select-gateway">
                  <SelectValue placeholder="Select gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                  <SelectItem value="Razorpay">Razorpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              data-testid="textarea-notes"
              placeholder="Additional notes about this payment account..."
              rows={3}
            />
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
              data-testid="button-submit-account"
            >
              Add Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
