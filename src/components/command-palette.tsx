import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingCart, Boxes, Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { products } from "@/data/seed";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (url: string) => {
    setOpen(false);
    navigate({ to: url });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/50"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Buscar…</span>
        <kbd className="rounded border border-border bg-muted px-1.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar pantallas o productos…" />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup heading="Navegación">
            <CommandItem onSelect={() => go("/dashboard")}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </CommandItem>
            <CommandItem onSelect={() => go("/pos")}>
              <ShoppingCart className="h-4 w-4" /> Punto de venta
            </CommandItem>
            <CommandItem onSelect={() => go("/inventario")}>
              <Boxes className="h-4 w-4" /> Inventario
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Productos">
            {products.slice(0, 6).map((p) => (
              <CommandItem key={p.id} value={p.nombre} onSelect={() => go("/pos")}>
                <ShoppingCart className="h-4 w-4" /> {p.nombre}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
