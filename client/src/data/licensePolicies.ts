export interface LicensePolicy {
  id: string;
  licenseType: string;
  gracePeriod: string;
  autoRenew: boolean;
  reminderFrequency: string;
  notificationChannels: string[];
  status: string;
}

export const licensePolicies: LicensePolicy[] = [
  {
    id: "1",
    licenseType: "Basic",
    gracePeriod: "7 days",
    autoRenew: true,
    reminderFrequency: "Weekly",
    notificationChannels: ["Email", "SMS"],
    status: "Active"
  },
  {
    id: "2", 
    licenseType: "Professional",
    gracePeriod: "14 days",
    autoRenew: true,
    reminderFrequency: "Bi-weekly",
    notificationChannels: ["Email", "SMS", "Push"],
    status: "Active"
  },
  {
    id: "3",
    licenseType: "Enterprise",
    gracePeriod: "30 days", 
    autoRenew: false,
    reminderFrequency: "Monthly",
    notificationChannels: ["Email", "SMS", "Push", "Slack"],
    status: "Inactive"
  },
  {
    id: "4",
    licenseType: "Trial",
    gracePeriod: "3 days",
    autoRenew: false,
    reminderFrequency: "Daily",
    notificationChannels: ["Email"],
    status: "Active"
  },
  {
    id: "5",
    licenseType: "Student",
    gracePeriod: "14 days",
    autoRenew: true,
    reminderFrequency: "Weekly",
    notificationChannels: ["Email", "SMS"],
    status: "Active"
  }
];