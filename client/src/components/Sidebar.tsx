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
import logo from "@/assets/MH Logo.png";

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
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
      ${collapsed ? "w-[72px]" : "w-[260px]"}`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-hidden">
          {!collapsed && (
            <img
              src={logo}
              alt="Mentor Health"
              className="h-12 w-auto object-contain transition-all duration-300 ml-11"
            />
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-[#0048FF]/10 text-[#0048FF] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? "text-[#0048FF]" : "text-gray-500"
                    }`}
                  />
                  {!collapsed && (
                    <span
                      className={`text-sm ${
                        isActive ? "text-[#0048FF]" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Optional footer / version info */}
      <div className="border-t border-gray-200 p-3 text-xs text-gray-400 text-center">
        {!collapsed && <span>© Mentor Health 2025</span>}
      </div>
    </aside>
  );
}
