import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/useAppStore";
import { ArrowLeft, Upload, Plus, X, MapPin, Globe, Users, Building } from "lucide-react";

export default function AddTenant() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addTenant } = useAppStore();
  
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: "",
    tenantType: "",
    licenseTier: "",
    
    // Master Admin Information
    masterAdminName: "",
    masterAdminEmail: "",
    masterAdminPhone: "",
    recoveryEmail: "",
    
    // Activation Information
    activationChannel: "",
    activatedBy: "",
    
    // Company Details
    companyWebsite: "",
    logo: null,
    logoPreview: null,
    
    // Social Media Links
    socialMediaLinks: [{ platform: "", url: "" }],
    
    // Location Information
    gpsLatitude: "",
    gpsLongitude: "",
    officeAddress: "",
    billingAddress: "",
    city: "",
    country: "",
    
    // Business Information
    branchCount: "",
    autoRenew: false,
    gracePeriod: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          logo: file,
          logoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialMediaLink = () => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: [...prev.socialMediaLinks, { platform: "", url: "" }]
    }));
  };

  const removeSocialMediaLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== index)
    }));
  };

  const updateSocialMediaLink = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.tenantType) newErrors.tenantType = "Tenant type is required";
    if (!formData.licenseTier) newErrors.licenseTier = "License tier is required";
    if (!formData.masterAdminName) newErrors.masterAdminName = "Master admin name is required";
    if (!formData.masterAdminEmail) newErrors.masterAdminEmail = "Master admin email is required";
    if (!formData.masterAdminPhone) newErrors.masterAdminPhone = "Master admin phone is required";
    if (!formData.activationChannel) newErrors.activationChannel = "Activation channel is required";
    if (!formData.activatedBy) newErrors.activatedBy = "Activated by is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.branchCount) newErrors.branchCount = "Branch count is required";
    if (!formData.gracePeriod) newErrors.gracePeriod = "Grace period is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.masterAdminEmail && !emailRegex.test(formData.masterAdminEmail)) {
      newErrors.masterAdminEmail = "Please enter a valid email address";
    }
    if (formData.recoveryEmail && !emailRegex.test(formData.recoveryEmail)) {
      newErrors.recoveryEmail = "Please enter a valid recovery email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Create tenant object
    const newTenant = {
      id: Date.now().toString(),
      name: formData.companyName,
      type: formData.tenantType,
      license: formData.licenseTier,
      status: "Active",
      geography: `${formData.city}, ${formData.country}`,
      activationDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      // Extended fields
      masterAdmin: {
        name: formData.masterAdminName,
        email: formData.masterAdminEmail,
        phone: formData.masterAdminPhone,
      },
      recoveryEmail: formData.recoveryEmail,
      activationChannel: formData.activationChannel,
      activatedBy: formData.activatedBy,
      website: formData.companyWebsite,
      logo: formData.logoPreview,
      socialMediaLinks: formData.socialMediaLinks.filter(link => link.platform && link.url),
      location: {
        latitude: parseFloat(formData.gpsLatitude) || null,
        longitude: parseFloat(formData.gpsLongitude) || null,
        officeAddress: formData.officeAddress,
        billingAddress: formData.billingAddress,
        city: formData.city,
        country: formData.country,
      },
      branchCount: parseInt(formData.branchCount) || 0,
      autoRenew: formData.autoRenew,
      gracePeriod: parseInt(formData.gracePeriod) || 0,
    };

    // Add to store
    addTenant(newTenant);

    // Show success toast
    toast({
      title: "Tenant Created",
      description: "Tenant has been created successfully!",
      variant: "default",
    });

    // Redirect to tenants page
    setTimeout(() => {
      setLocation("/tenants");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLocation("/tenants")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tenants
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-mentor-black">Add New Tenant</h1>
          <p className="text-gray-600 mt-1">
            Create a new tenant account with comprehensive details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  data-testid="input-company-name"
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">{errors.companyName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantType">Tenant Type *</Label>
                <Select
                  value={formData.tenantType}
                  onValueChange={(value) => handleInputChange("tenantType", value)}
                >
                  <SelectTrigger data-testid="select-tenant-type" className={errors.tenantType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select tenant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tenantType && (
                  <p className="text-sm text-red-500">{errors.tenantType}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseTier">License Tier *</Label>
              <Select
                value={formData.licenseTier}
                onValueChange={(value) => handleInputChange("licenseTier", value)}
              >
                <SelectTrigger data-testid="select-license-tier" className={errors.licenseTier ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select license tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              {errors.licenseTier && (
                <p className="text-sm text-red-500">{errors.licenseTier}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Master Admin Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Master Admin Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="masterAdminName">Master Admin Name *</Label>
                <Input
                  id="masterAdminName"
                  required
                  value={formData.masterAdminName}
                  onChange={(e) => handleInputChange("masterAdminName", e.target.value)}
                  data-testid="input-admin-name"
                  className={errors.masterAdminName ? "border-red-500" : ""}
                />
                {errors.masterAdminName && (
                  <p className="text-sm text-red-500">{errors.masterAdminName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="masterAdminEmail">Master Admin Email *</Label>
                <Input
                  id="masterAdminEmail"
                  type="email"
                  required
                  value={formData.masterAdminEmail}
                  onChange={(e) => handleInputChange("masterAdminEmail", e.target.value)}
                  data-testid="input-admin-email"
                  className={errors.masterAdminEmail ? "border-red-500" : ""}
                />
                {errors.masterAdminEmail && (
                  <p className="text-sm text-red-500">{errors.masterAdminEmail}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="masterAdminPhone">Master Admin Phone *</Label>
                <Input
                  id="masterAdminPhone"
                  required
                  value={formData.masterAdminPhone}
                  onChange={(e) => handleInputChange("masterAdminPhone", e.target.value)}
                  data-testid="input-admin-phone"
                  className={errors.masterAdminPhone ? "border-red-500" : ""}
                />
                {errors.masterAdminPhone && (
                  <p className="text-sm text-red-500">{errors.masterAdminPhone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="recoveryEmail">Recovery Email</Label>
                <Input
                  id="recoveryEmail"
                  type="email"
                  value={formData.recoveryEmail}
                  onChange={(e) => handleInputChange("recoveryEmail", e.target.value)}
                  data-testid="input-recovery-email"
                  className={errors.recoveryEmail ? "border-red-500" : ""}
                />
                {errors.recoveryEmail && (
                  <p className="text-sm text-red-500">{errors.recoveryEmail}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activation Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Activation Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activationChannel">Activation Channel *</Label>
                <Select
                  value={formData.activationChannel}
                  onValueChange={(value) => handleInputChange("activationChannel", value)}
                >
                  <SelectTrigger data-testid="select-activation-channel" className={errors.activationChannel ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select activation channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Direct">Direct</SelectItem>
                    <SelectItem value="Affiliate">Affiliate</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                  </SelectContent>
                </Select>
                {errors.activationChannel && (
                  <p className="text-sm text-red-500">{errors.activationChannel}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="activatedBy">Activated By *</Label>
                <Select
                  value={formData.activatedBy}
                  onValueChange={(value) => handleInputChange("activatedBy", value)}
                >
                  <SelectTrigger data-testid="select-activated-by" className={errors.activatedBy ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select activated by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="System">System</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Reseller">Reseller</SelectItem>
                    <SelectItem value="Affiliate">Affiliate</SelectItem>
                  </SelectContent>
                </Select>
                {errors.activatedBy && (
                  <p className="text-sm text-red-500">{errors.activatedBy}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                type="url"
                value={formData.companyWebsite}
                onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                data-testid="input-company-website"
                placeholder="https://example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    data-testid="input-logo-upload"
                  />
                  <Label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Logo
                  </Label>
                </div>
                {formData.logoPreview && (
                  <div className="flex items-center gap-2">
                    <img
                      src={formData.logoPreview}
                      alt="Logo preview"
                      className="w-12 h-12 object-cover rounded-md border"
                      data-testid="logo-preview"
                    />
                    <span className="text-sm text-gray-600">{formData.logo?.name}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.socialMediaLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={link.platform}
                    onValueChange={(value) => updateSocialMediaLink(index, "platform", value)}
                  >
                    <SelectTrigger className="w-32" data-testid={`select-social-platform-${index}`}>
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={link.url}
                    onChange={(e) => updateSocialMediaLink(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                    data-testid={`input-social-url-${index}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSocialMediaLink(index)}
                    data-testid={`button-remove-social-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSocialMediaLink}
                className="w-full"
                data-testid="button-add-social-link"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Social Media Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpsLatitude">GPS Latitude</Label>
                <Input
                  id="gpsLatitude"
                  type="number"
                  step="any"
                  value={formData.gpsLatitude}
                  onChange={(e) => handleInputChange("gpsLatitude", e.target.value)}
                  data-testid="input-gps-latitude"
                  placeholder="33.6844"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpsLongitude">GPS Longitude</Label>
                <Input
                  id="gpsLongitude"
                  type="number"
                  step="any"
                  value={formData.gpsLongitude}
                  onChange={(e) => handleInputChange("gpsLongitude", e.target.value)}
                  data-testid="input-gps-longitude"
                  placeholder="73.0479"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="officeAddress">Office Address</Label>
              <Textarea
                id="officeAddress"
                value={formData.officeAddress}
                onChange={(e) => handleInputChange("officeAddress", e.target.value)}
                data-testid="textarea-office-address"
                placeholder="Enter complete office address..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Textarea
                id="billingAddress"
                value={formData.billingAddress}
                onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                data-testid="textarea-billing-address"
                placeholder="Enter billing address (if different from office address)..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  data-testid="input-city"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  data-testid="input-country"
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-red-500">{errors.country}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchCount">Branch Count *</Label>
                <Input
                  id="branchCount"
                  type="number"
                  min="0"
                  required
                  value={formData.branchCount}
                  onChange={(e) => handleInputChange("branchCount", e.target.value)}
                  data-testid="input-branch-count"
                  className={errors.branchCount ? "border-red-500" : ""}
                />
                {errors.branchCount && (
                  <p className="text-sm text-red-500">{errors.branchCount}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gracePeriod">Grace Period (days) *</Label>
                <Input
                  id="gracePeriod"
                  type="number"
                  min="0"
                  required
                  value={formData.gracePeriod}
                  onChange={(e) => handleInputChange("gracePeriod", e.target.value)}
                  data-testid="input-grace-period"
                  className={errors.gracePeriod ? "border-red-500" : ""}
                />
                {errors.gracePeriod && (
                  <p className="text-sm text-red-500">{errors.gracePeriod}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="autoRenew"
                checked={formData.autoRenew}
                onCheckedChange={(checked) => handleInputChange("autoRenew", checked)}
                data-testid="switch-auto-renew"
              />
              <Label htmlFor="autoRenew">Auto-Renew Subscription</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/tenants")}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-mentor-blue hover:bg-mentor-blue/90"
            data-testid="button-submit-tenant"
          >
            Create Tenant
          </Button>
        </div>
      </form>
    </div>
  );
}
