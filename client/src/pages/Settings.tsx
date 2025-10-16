import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure platform settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              defaultValue="Mentor Health Platform"
              data-testid="input-platform-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              defaultValue="support@mentorhealth.com"
              data-testid="input-support-email"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage your preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about platform activity
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              data-testid="switch-notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Switch
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
              data-testid="switch-2fa"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" data-testid="button-cancel">
          Cancel
        </Button>
        <Button data-testid="button-save">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
