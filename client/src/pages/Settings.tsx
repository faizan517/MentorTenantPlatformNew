import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function Settings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [localization, setLocalization] = useState("English");
  const { toast } = useToast();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-mentor-black">Settings</h1>
        <p className="text-gray-600 mt-1">Configure platform settings and branding</p>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Brand Settings</CardTitle>
          <CardDescription>Customize your platform's appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="logo-upload">Brand Logo</Label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain rounded-xl"
                    data-testid="img-logo-preview"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  data-testid="input-logo-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                  data-testid="button-upload-logo"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
                <p className="text-sm text-gray-500">
                  Recommended size: 200x200px. PNG or JPG format.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl shadow-sm border border-gray-200"
                style={{ backgroundColor: "#0048FF" }}
                data-testid="color-preview"
              />
              <div className="flex-1">
                <Input
                  id="primary-color"
                  value="#0048FF"
                  disabled
                  className="font-mono"
                  data-testid="input-primary-color"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Mentor Health brand color (locked)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Localization</CardTitle>
          <CardDescription>Set your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="language">Language</Label>
            <Select value={localization} onValueChange={setLocalization}>
              <SelectTrigger id="language" data-testid="select-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English" data-testid="option-english">English</SelectItem>
                <SelectItem value="Urdu" data-testid="option-urdu">Urdu (اردو)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setLogoPreview(null);
            setLocalization("English");
          }}
          data-testid="button-reset"
        >
          Reset
        </Button>
        <Button
          onClick={handleSave}
          className="bg-mentor-blue hover:bg-blue-700"
          data-testid="button-save"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
