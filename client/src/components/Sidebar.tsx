import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building2, 
  Key, 
  Database, 
  Cpu, 
  Smartphone, 
  CreditCard, 
  Shield, 
  Users, 
  Settings 
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/tenants", icon: Building2, label: "Tenants" },
  { path: "/licenses", icon: Key, label: "Licenses" },
  { path: "/metadata", icon: Database, label: "Metadata" },
  { path: "/processors", icon: Cpu, label: "Processors" },
  { path: "/devices", icon: Smartphone, label: "Devices" },
  { path: "/billing", icon: CreditCard, label: "Billing" },
  { path: "/roles", icon: Shield, label: "Roles" },
  { path: "/users", icon: Users, label: "Users" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          Mentor Health
        </h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover-elevate"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
