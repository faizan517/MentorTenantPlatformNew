import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Card from "@/components/Card";
import TableWidget from "@/components/TableWidget";
import Modal from "@/components/Modal";
import { Plus, Edit, Trash2 } from "lucide-react";
import { licensePolicies, type LicensePolicy as LicensePolicyType } from "@/data/licensePolicies";

type LicensePolicy = LicensePolicyType;

export default function LicenseManagerUI() {
  const [policies, setPolicies] = useState<LicensePolicy[]>(licensePolicies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<LicensePolicy | null>(null);
  const [formData, setFormData] = useState({
    licenseType: "",
    gracePeriod: "",
    autoRenew: false,
    reminderFrequency: "",
    notificationChannels: [] as string[],
    status: "Active"
  });

  const notificationOptions = ["Email", "SMS", "Push", "Slack"];
  const reminderOptions = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
  const gracePeriodOptions = ["3 days", "7 days", "14 days", "30 days", "60 days"];

  const handleEdit = (policy: LicensePolicy) => {
    setEditingPolicy(policy);
    setFormData({
      licenseType: policy.licenseType,
      gracePeriod: policy.gracePeriod,
      autoRenew: policy.autoRenew,
      reminderFrequency: policy.reminderFrequency,
      notificationChannels: [...policy.notificationChannels],
      status: policy.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const policyData = {
      id: editingPolicy?.id || Date.now().toString(),
      ...formData
    };

    if (editingPolicy) {
      setPolicies(policies.map((p) => (p.id === editingPolicy.id ? policyData : p)));
    } else {
      setPolicies([...policies, policyData]);
    }

    setIsModalOpen(false);
    setEditingPolicy(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setPolicies(policies.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setFormData({
      licenseType: "",
      gracePeriod: "",
      autoRenew: false,
      reminderFrequency: "",
      notificationChannels: [],
      status: "Active"
    });
  };

  const handleAddNew = () => {
    setEditingPolicy(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleNotificationChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        notificationChannels: [...formData.notificationChannels, channel]
      });
    } else {
      setFormData({
        ...formData,
        notificationChannels: formData.notificationChannels.filter(c => c !== channel)
      });
    }
  };

  // Transform data for TableWidget
  const tableData = policies.map(policy => ({
    license_type: policy.licenseType,
    grace_period: policy.gracePeriod,
    auto_renew: (
      <Switch 
        checked={policy.autoRenew} 
        disabled 
        className="data-[state=checked]:bg-mentor-blue"
      />
    ),
    reminder_frequency: policy.reminderFrequency,
    notification_channels: policy.notificationChannels.join(", "),
    status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        policy.status === "Active" 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800"
      }`}>
        {policy.status}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(policy)}
          data-testid={`button-edit-${policy.id}`}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(policy.id)}
          className="text-red-600 hover:text-red-800"
          data-testid={`button-delete-${policy.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    )
  }));

  const tableHeaders = [
    "License Type",
    "Grace Period", 
    "Auto-Renew",
    "Reminder Frequency",
    "Notification Channels",
    "Status",
    "Actions"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">License Policy Manager</h1>
          <p className="text-gray-600 mt-1">Manage license policies and renewal settings</p>
        </div>
        <Button
          className="bg-mentor-blue hover:bg-mentor-blue/90"
          onClick={handleAddNew}
          data-testid="button-add-policy"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Policy
        </Button>
      </div>

      <TableWidget
        title="License Policies"
        headers={tableHeaders}
        data={tableData}
        testId="license-policies-table"
      />

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingPolicy ? "Edit License Policy" : "Add New License Policy"}
        description={
          editingPolicy
            ? "Update license policy settings"
            : "Create a new license policy"
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license-type">License Type</Label>
            <Input
              id="license-type"
              required
              value={formData.licenseType}
              onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
              data-testid="input-license-type"
              placeholder="e.g., Basic, Professional, Enterprise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grace-period">Grace Period</Label>
            <Select
              value={formData.gracePeriod}
              onValueChange={(value) => setFormData({ ...formData, gracePeriod: value })}
            >
              <SelectTrigger data-testid="select-grace-period">
                <SelectValue placeholder="Select grace period" />
              </SelectTrigger>
              <SelectContent>
                {gracePeriodOptions.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-renew"
              checked={formData.autoRenew}
              onCheckedChange={(checked) => setFormData({ ...formData, autoRenew: checked })}
              data-testid="switch-auto-renew"
              className="data-[state=checked]:bg-mentor-blue"
            />
            <Label htmlFor="auto-renew">Auto-Renew</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
            <Select
              value={formData.reminderFrequency}
              onValueChange={(value) => setFormData({ ...formData, reminderFrequency: value })}
            >
              <SelectTrigger data-testid="select-reminder-frequency">
                <SelectValue placeholder="Select reminder frequency" />
              </SelectTrigger>
              <SelectContent>
                {reminderOptions.map((frequency) => (
                  <SelectItem key={frequency} value={frequency}>
                    {frequency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Notification Channels</Label>
            <div className="grid grid-cols-2 gap-2">
              {notificationOptions.map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={`channel-${channel}`}
                    checked={formData.notificationChannels.includes(channel)}
                    onCheckedChange={(checked) => 
                      handleNotificationChannelChange(channel, checked as boolean)
                    }
                    data-testid={`checkbox-${channel.toLowerCase()}`}
                  />
                  <Label htmlFor={`channel-${channel}`} className="text-sm">
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger data-testid="select-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              data-testid="button-cancel-policy"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-mentor-blue hover:bg-mentor-blue/90"
              data-testid="button-submit-policy"
            >
              {editingPolicy ? "Update" : "Create"} Policy
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}