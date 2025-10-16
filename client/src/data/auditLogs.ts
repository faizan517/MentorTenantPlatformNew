export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  status: 'Success' | 'Failed' | 'Pending';
}

export const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-10-16",
    user: "Bilal Ahmed",
    action: "Edited Tenant Profile",
    module: "Tenants",
    status: "Success"
  },
  {
    id: "2", 
    timestamp: "2024-10-16",
    user: "System",
    action: "Sent email notification",
    module: "Notifications",
    status: "Success"
  },
  {
    id: "3",
    timestamp: "2024-10-16",
    user: "Sarah Khan",
    action: "Created new license package",
    module: "Licenses",
    status: "Success"
  },
  {
    id: "4",
    timestamp: "2024-10-16",
    user: "Ahmed Ali",
    action: "Updated user permissions",
    module: "Users",
    status: "Failed"
  },
  {
    id: "5",
    timestamp: "2024-10-16",
    user: "System",
    action: "Automated backup completed",
    module: "System",
    status: "Success"
  },
  {
    id: "6",
    timestamp: "2024-10-16",
    user: "Fatima Sheikh",
    action: "Processed payment",
    module: "Billing",
    status: "Success"
  },
  {
    id: "7",
    timestamp: "2024-10-16",
    user: "Hassan Raza",
    action: "Added new device",
    module: "Devices",
    status: "Pending"
  },
  {
    id: "8",
    timestamp: "2024-10-16",
    user: "System",
    action: "License renewal reminder sent",
    module: "Licenses",
    status: "Success"
  },
  {
    id: "9",
    timestamp: "2024-10-16",
    user: "Zain Malik",
    action: "Updated processor configuration",
    module: "Processors",
    status: "Failed"
  },
  {
    id: "10",
    timestamp: "2024-10-16",
    user: "Ayesha Tariq",
    action: "Generated monthly report",
    module: "Reports",
    status: "Success"
  }
];