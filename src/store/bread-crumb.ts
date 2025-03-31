import { create } from 'zustand'

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbState {
    breadcrumbItems: BreadcrumbItem[];
    setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
    addBreadcrumbItem: (item: BreadcrumbItem) => void;
    clearBreadcrumbItems: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
    breadcrumbItems: [],
    setBreadcrumbItems: (items) => set({ breadcrumbItems: items }),
    addBreadcrumbItem: (item) => set((state) => ({
        breadcrumbItems: [...state.breadcrumbItems, item],
    })),
    clearBreadcrumbItems: () => set({ breadcrumbItems: [] }),
}));