import { create } from "zustand";

interface Tenant {
  id: string;
  name: string;
  type: string;
  license: string;
  status: string;
  geography: string;
  activationDate: string;
  expiryDate: string;
}

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, "id">) => void;
  updateTenant: (id: string, updates: Partial<Tenant>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  tenants: [],
  addTenant: (tenant) =>
    set((state) => ({
      tenants: [
        ...state.tenants,
        { ...tenant, id: Date.now().toString() },
      ],
    })),
  updateTenant: (id, updates) =>
    set((state) => ({
      tenants: state.tenants.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
}));
