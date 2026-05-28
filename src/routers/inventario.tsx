import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, Package, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

import { inventory, products, type InventoryItem } from "@/data/seed";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/inventario")({
  head: () => ({
    meta: [
      { title: "Inventario — Flux Ops" },
      { name: "description", content: "Control de stock por talla con alertas de mínimos." },
    ],
  }),
  component: Inventario,
});

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

type Status = "ok" | "bajo" | "agotado";
const statusOf = (i: InventoryItem): Status =>
  i.stock_actual === 0 ? "agotado" : i.stock_actual <= i.stock_minimo ? "bajo" : "ok";

const STATUS_META: Record<Status, { label: string; dot: string; text: string }> = {
  ok: { label: "En stock", dot: "bg-success", text: "text-success" },
  bajo: { label: "Stock bajo", dot: "bg-warning", text: "text-warning-foreground" },
  agotado: { label: "Agotado", dot: "bg-destructive", text: "text-destructive" },
};

const FILTERS = ["Todos", "En stock", "Stock bajo", "Agotado"] as const;

function Inventario() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [detail, setDetail] = useState<InventoryItem | null>(null);

  const priceOf = (nombre: string) =>
    products.find((p) => norm(p.nombre) === norm(nombre))?.precio ?? 0;

  const rows = useMemo(() => {
    return inventory.filter((i) => {
      const s = statusOf(i);
      const matchFilter =
        filter === "Todos" ||
        (filter === "En stock" && s === "ok") ||
        (filter === "Stock bajo" && s === "bajo") ||
        (filter === "Agotado" && s === "agotado");
      const matchQuery = query === "" || norm(i.nombre).includes(norm(query));
      return matchFilter && matchQuery;
    });
  }, [query, filter]);

  const counts = useMemo(() => {
    const c = { bajo: 0, agotado: 0, total: inventory.length };
    inventory.forEach((i) => {
      const s = statusOf(i);
      if (s === "bajo") c.bajo++;
      if (s === "agotado") c.agotado++;
    });
    return c;
  }, []);

  const toggle = (id: number) =>
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <div className="mx-auto max-w-[1400px] space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventario</h1>
          <p className="text-sm text-muted-foreground">
            {counts.total} variantes · <span className="text-warning-foreground">{counts.bajo} con stock bajo</span> ·{" "}
            <span className="text-destructive">{counts.agotado} agotadas</span>
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículo…"
            className="h-9 rounded-lg pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="w-10 px-3 py-2.5">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(c) =>
                    setSelected(c ? new Set(rows.map((r) => r.id)) : new Set())
                  }
                />
              </th>
              <th className="px-3 py-2.5 font-medium">Artículo</th>
              <th className="px-3 py-2.5 font-medium">Talla</th>
              <th className="px-3 py-2.5 text-right font-medium">Precio</th>
              <th className="px-3 py-2.5 text-right font-medium">Stock</th>
              <th className="px-3 py-2.5 text-right font-medium">Mínimo</th>
              <th className="px-3 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => {
              const s = statusOf(i);
              const meta = STATUS_META[s];
              return (
                <tr
                  key={i.id}
                  onClick={() => setDetail(i)}
                  className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                >
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.has(i.id)} onCheckedChange={() => toggle(i.id)} />
                  </td>
                  <td className="px-3 py-2.5 font-medium">{i.nombre}</td>
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{i.talla}</td>
                  <td className="px-3 py-2.5 text-right font-mono">{currency(priceOf(i.nombre))}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-medium">{i.stock_actual}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">{i.stock_minimo}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", meta.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                      {meta.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-12 text-center text-sm text-muted-foreground">
                  Sin artículos para este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk actions */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-popover px-4 py-2.5 shadow-lg"
          >
            <span className="text-sm font-medium">{selected.size} seleccionados</span>
            <div className="h-4 w-px bg-border" />
            <Button size="sm" variant="ghost" className="h-7">Reabastecer</Button>
            <Button size="sm" variant="ghost" className="h-7">Exportar</Button>
            <Button size="sm" variant="ghost" className="h-7" onClick={() => setSelected(new Set())}>
              Limpiar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detalle */}
      <Sheet open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <SheetContent>
          {detail && (
            <>
              <SheetHeader>
                <SheetTitle>{detail.nombre}</SheetTitle>
                <SheetDescription>Talla {detail.talla} · {detail.unidad}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  {(() => {
                    const s = statusOf(detail);
                    const Icon = s === "ok" ? CheckCircle2 : s === "bajo" ? AlertTriangle : XCircle;
                    return (
                      <>
                        <Icon className={cn("h-5 w-5", STATUS_META[s].text)} />
                        <div>
                          <p className="text-sm font-medium">{STATUS_META[s].label}</p>
                          <p className="text-xs text-muted-foreground">
                            {detail.stock_actual} en existencia · mínimo {detail.stock_minimo}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Precio" value={currency(priceOf(detail.nombre))} />
                  <Stat label="Stock actual" value={String(detail.stock_actual)} />
                  <Stat label="Stock mínimo" value={String(detail.stock_minimo)} />
                  <Stat label="Unidad" value={detail.unidad} />
                </div>
                <Button className="w-full">
                  <Package className="h-4 w-4" /> Reabastecer artículo
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold">{value}</p>
    </div>
  );
}
