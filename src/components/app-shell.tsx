import { Outlet, useRouterState } from "@tanstack/react-router";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pos": "Punto de venta",
  "/inventario": "Inventario",
};

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const title = TITLES[path] ?? "Flux Ops";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
            <SidebarTrigger className="text-muted-foreground" />
            <div className="hidden items-center gap-2 text-sm sm:flex">
              <span className="text-muted-foreground">Flux Ops</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="font-medium text-foreground">{title}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden md:block">
                <CommandPalette />
              </div>
              <ThemeToggle />
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
                  FO
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
