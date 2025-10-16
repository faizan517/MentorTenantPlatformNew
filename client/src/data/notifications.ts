export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    title: "License Expiring Soon",
    message: "Professional license for Tenant ABC expires in 3 days",
    type: "warning",
    timestamp: "2024-10-16 14:30:00",
    read: false
  },
  {
    id: "2",
    title: "Payment Processed",
    message: "Monthly subscription payment of PKR 15,000 processed successfully",
    type: "info", 
    timestamp: "2024-10-16 14:25:00",
    read: false
  },
  {
    id: "3",
    title: "System Error",
    message: "Failed to sync data with external API. Retrying...",
    type: "error",
    timestamp: "2024-10-16 14:20:00",
    read: true
  },
  {
    id: "4",
    title: "New User Registration",
    message: "New user Sarah Khan registered for Tenant XYZ",
    type: "info",
    timestamp: "2024-10-16 14:15:00", 
    read: false
  },
  {
    id: "5",
    title: "Backup Completed",
    message: "Daily system backup completed successfully",
    type: "info",
    timestamp: "2024-10-16 14:10:00",
    read: true
  },
  {
    id: "6",
    title: "High CPU Usage",
    message: "Server CPU usage exceeded 85% threshold",
    type: "warning",
    timestamp: "2024-10-16 14:05:00",
    read: false
  }
];