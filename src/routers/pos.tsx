import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Minus, Trash2, ShoppingCart, X, CreditCard, Banknote, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

import { products, inventory } from "@/data/seed";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/pos")({
  head: () => ({
    meta: [
      { title: "Punto de venta — Flux Ops" },
      { name: "description", content: "Registra ventas rápido con búsqueda y cobro ágil." },
    ],
  }),
  component: POS,
});

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

type CartLine = { key: string; productId: number; nombre: string; talla: string; precio: number; qty: number };
const PAYMENTS = [
  { id: "Efectivo", icon: Banknote },
  { id: "Tarjeta", icon: CreditCard },
  { id: "Transferencia", icon: ArrowLeftRight },
] as const;

function POS() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState<string>("Efectivo");

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((p) => p.category)))], []);

  const tallasByProduct = useMemo(() => {
    const m = new Map<string, string[]>();
    inventory.forEach((i) => {
      const k = norm(i.nombre);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(i.talla);
    });
    return m;
  }, []);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todos" || p.category === cat) &&
          (query === "" || norm(p.nombre).includes(norm(query))),
      ),
    [query, cat],
  );

  const addToCart = (productId: number, nombre: string, precio: number, talla: string) => {
    const key = `${productId}-${talla}`;
    setCart((c) => {
      const ex = c.find((l) => l.key === key);
      if (ex) return c.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { key, productId, nombre, talla, precio, qty: 1 }];
    });
  };

  const setQty = (key: string, d: number) =>
    setCart((c) =>
      c
        .map((l) => (l.key === key ? { ...l, qty: Math.max(0, l.qty + d) } : l))
        .filter((l) => l.qty > 0),
    );

  const total = cart.reduce((a, l) => a + l.precio * l.qty, 0);
  const units = cart.reduce((a, l) => a + l.qty, 0);

  const confirm = () => {
    setCheckout(false);
    setCart([]);
    toast.success("Venta registrada", {
      description: `${units} artículos · ${currency(total)} · ${payment}`,
    });
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      {/* Catálogo */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto…"
              className="h-11 rounded-lg pl-9 text-base"
              autoFocus
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-accent",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid flex-1 auto-rows-min grid-cols-2 gap-3 overflow-y-auto pb-4 sm:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const tallas = tallasByProduct.get(norm(p.nombre)) ?? ["Unitalla"];
            return (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => tallas.length === 1 && addToCart(p.id, p.nombre, p.precio, tallas[0])}
                className="group flex flex-col rounded-xl border border-border bg-card p-3 text-left shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex aspect-square items-center justify-center rounded-lg bg-accent/60 text-lg font-semibold text-accent-foreground">
                  {p.nombre.slice(0, 1)}
                </div>
                <span className="line-clamp-2 text-sm font-medium leading-tight">{p.nombre}</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground">{p.subcategory}</span>
                <span className="mt-2 font-mono text-sm font-semibold text-primary">{currency(p.precio)}</span>
                {tallas.length > 1 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tallas.map((t) => (
                      <span
                        key={t}
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p.id, p.nombre, p.precio, t);
                        }}
                        className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Ticket */}
      <aside className="flex w-full shrink-0 flex-col border-t border-border bg-card lg:w-[360px] lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Ticket actual</span>
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} className="text-xs text-muted-foreground hover:text-destructive">
              Vaciar
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <ShoppingCart className="h-8 w-8 opacity-30" />
              <p>Agrega productos para iniciar una venta.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cart.map((l) => (
                <motion.div
                  key={l.key}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-accent/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.nombre}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {l.talla} · {currency(l.precio)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(l.key, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center font-mono text-sm">{l.qty}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(l.key, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="w-16 text-right font-mono text-sm font-medium">{currency(l.precio * l.qty)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Artículos</span>
            <span className="font-mono">{units}</span>
          </div>
          <div className="mb-4 flex items-end justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="font-mono text-2xl font-semibold tracking-tight">{currency(total)}</span>
          </div>
          <Button className="h-12 w-full text-base" disabled={cart.length === 0} onClick={() => setCheckout(true)}>
            Cobrar {cart.length > 0 && currency(total)}
          </Button>
        </div>
      </aside>

      {/* Cobro */}
      <Dialog open={checkout} onOpenChange={setCheckout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cobro</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="rounded-xl bg-accent/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Total a cobrar</p>
              <p className="font-mono text-3xl font-semibold tracking-tight">{currency(total)}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Método de pago</p>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors",
                      payment === p.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-accent",
                    )}
                  >
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                    {p.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckout(false)}>
              <X className="h-4 w-4" /> Cancelar
            </Button>
            <Button onClick={confirm}>Confirmar venta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
