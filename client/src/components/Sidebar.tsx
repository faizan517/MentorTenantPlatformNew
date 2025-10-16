import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building2, 
  Key, 
  Database, 
  CreditCard as CardIcon,
  Stethoscope,
  FileText,
  Shield, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/tenants", icon: Building2, label: "Tenant Accounts" },
  { path: "/licenses", icon: Key, label: "License Packages" },
  { path: "/metadata", icon: Database, label: "Meta Data" },
  { path: "/processors", icon: CardIcon, label: "Payment Processors" },
  { path: "/devices", icon: Stethoscope, label: "Medical Devices" },
  { path: "/billing", icon: FileText, label: "Billing" },
  { path: "/roles", icon: Shield, label: "Roles & Rights" },
  { path: "/users", icon: Users, label: "Internal Users" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const collapsed = !sidebarOpen;

  return (
    <aside className={`fixed left-0 top-0 h-screen ${collapsed ? 'w-[70px]' : 'w-[280px]'} bg-mentor-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-mentor-black">
            Mentor Health
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ml-auto"
          data-testid="button-toggle-sidebar"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
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
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative
                    ${
                      isActive
                        ? "bg-mentor-blue/5 text-mentor-blue border-l-4 border-mentor-blue"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
