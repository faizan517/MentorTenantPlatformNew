import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import Tenants from "@/pages/Tenants";
import TenantProfile from "@/pages/TenantProfile";
import Licenses from "@/pages/Licenses";
import MetaData from "@/pages/MetaData";
import Processors from "@/pages/Processors";
import Devices from "@/pages/Devices";
import Billing from "@/pages/Billing";
import Roles from "@/pages/Roles";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tenants" component={Tenants} />
      <Route path="/tenants/:id" component={TenantProfile} />
      <Route path="/licenses" component={Licenses} />
      <Route path="/metadata" component={MetaData} />
      <Route path="/processors" component={Processors} />
      <Route path="/devices" component={Devices} />
      <Route path="/billing" component={Billing} />
      <Route path="/roles" component={Roles} />
      <Route path="/users" component={Users} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex h-screen w-full bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-[280px]">
            <Navbar />
            <main className="flex-1 overflow-auto mt-16 p-6">
              <Router />
            </main>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
