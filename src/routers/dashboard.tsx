import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, ShoppingBag, Receipt, Gift, ArrowUpRight } from "lucide-react";

import { sales } from "@/data/seed";
import { currency, compact, parseDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flux Ops" },
      { name: "description", content: "Tablero de ventas, ticket promedio y desempeño de retail." },
    ],
  }),
  component: Dashboard,
});

const PERIODS = ["7 días", "30 días", "Todo"] as const;
type Period = (typeof PERIODS)[number];

function Dashboard() {
  const [period, setPeriod] = useState<Period>("Todo");

  const data = useMemo(() => {
    const sorted = [...sales].sort(
      (a, b) => parseDate(a.created_at).getTime() - parseDate(b.created_at).getTime(),
    );
    const dates = sorted.map((s) => parseDate(s.created_at).getTime());
    const max = Math.max(...dates);
    const days = period === "7 días" ? 7 : period === "30 días" ? 30 : Infinity;
    const cutoff = max - days * 24 * 3600 * 1000;
    const filtered = sorted.filter((s) => parseDate(s.created_at).getTime() >= cutoff);

    const totalVentas = filtered.reduce((a, s) => a + s.total, 0);
    const unidades = filtered.reduce((a, s) => a + s.cantidad, 0);
    const tickets = new Set(filtered.map((s) => s.ticket_id)).size || 1;
    const ticketProm = totalVentas / tickets;
    const cortesias = filtered.filter((s) => s.courtesy_percent > 0).length;
    const cortesiaPct = filtered.length ? (cortesias / filtered.length) * 100 : 0;

    const byDayMap = new Map<string, number>();
    filtered.forEach((s) => {
      const d = parseDate(s.created_at);
      const key = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      byDayMap.set(key, (byDayMap.get(key) ?? 0) + s.total);
    });
    const byDay = [...byDayMap.entries()].map(([name, total]) => ({ name, total }));

    const byPmMap = new Map<string, number>();
    filtered.forEach((s) => byPmMap.set(s.payment_method, (byPmMap.get(s.payment_method) ?? 0) + s.total));
    const byPm = [...byPmMap.entries()].map(([name, value]) => ({ name, value }));

    const byProdMap = new Map<string, number>();
    filtered.forEach((s) =>
      byProdMap.set(s.product_nombre, (byProdMap.get(s.product_nombre) ?? 0) + s.total),
    );
    const topProd = [...byProdMap.entries()]
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);

    return { totalVentas, unidades, ticketProm, cortesiaPct, byDay, byPm, topProd };
  }, [period]);

  const pmColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

  const kpis = [
    { label: "Ventas del periodo", value: currency(data.totalVentas), icon: TrendingUp, delta: "+12.4%" },
    { label: "Unidades vendidas", value: String(data.unidades), icon: ShoppingBag, delta: "+8.1%" },
    { label: "Ticket promedio", value: currency(data.ticketProm), icon: Receipt, delta: "+3.2%" },
    { label: "Ventas con cortesía", value: `${data.cortesiaPct.toFixed(0)}%`, icon: Gift, delta: "-1.0%" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resumen</h1>
          <p className="text-sm text-muted-foreground">Desempeño general de tu tienda.</p>
        </div>
        <div className="flex rounded-lg border border-border bg-card p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                period === p
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{k.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <k.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
            </div>
            <div className="mt-3 font-mono text-2xl font-semibold tracking-tight">{k.value}</div>
            <div
              className={cn(
                "mt-1 inline-flex items-center gap-0.5 text-xs",
                k.delta.startsWith("-") ? "text-destructive" : "text-success",
              )}
            >
              <ArrowUpRight className={cn("h-3 w-3", k.delta.startsWith("-") && "rotate-90")} />
              {k.delta} vs anterior
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts bento */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs lg:col-span-2">
          <h3 className="text-sm font-semibold">Ventas por día</h3>
          <p className="mb-4 text-xs text-muted-foreground">Total facturado en el periodo</p>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.byDay} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v) => compact(v as number)} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }}
                  formatter={(v) => [currency(v as number), "Ventas"]}
                />
                <Area type="monotone" dataKey="total" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
          <h3 className="text-sm font-semibold">Por método de pago</h3>
          <p className="mb-4 text-xs text-muted-foreground">Distribución del ingreso</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.byPm} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
                  {data.byPm.map((_, i) => (
                    <Cell key={i} fill={pmColors[i % pmColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }}
                  formatter={(v) => currency(v as number)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {data.byPm.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: pmColors[i % pmColors.length] }} />
                  {p.name}
                </span>
                <span className="font-mono text-muted-foreground">{currency(p.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <h3 className="text-sm font-semibold">Productos más vendidos</h3>
        <p className="mb-4 text-xs text-muted-foreground">Por ingreso generado</p>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topProd} layout="vertical" margin={{ left: 24, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" tickFormatter={(v) => compact(v as number)} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={140} stroke="var(--color-muted-foreground)" />
              <Tooltip
                cursor={{ fill: "var(--color-accent)" }}
                contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }}
                formatter={(v) => [currency(v as number), "Ventas"]}
              />
              <Bar dataKey="total" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
