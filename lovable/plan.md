# Rediseño Flux-Ops — Minimal Premium (maqueta de referencia)

## Contexto y por qué este enfoque

El ZIP descargado de GitHub **no incluye la carpeta `src/`** con el código de la app (POS, Inventario, Dashboards viven solo en tu PC, nunca se hizo push). Como no puedo rediseñar código que no existe en el repo, voy a **reconstruir las pantallas aquí en Lovable** (web) con el nuevo diseño, usando tus datos reales como semilla. El resultado es una maqueta navegable y pulida que sirve como:

- Referencia visual exacta (tokens, componentes, layouts) para portar a tu Electron + React + Chakra.
- Prueba en vivo del look "Minimal premium" estilo Linear/Notion sobre tu negocio real.

No toco tu Electron, IPC ni `main process` (no están aquí). Trabajo solo presentación.

## Lo que descubrí en tus datos

- Negocio retail: **Gorras, Calzado, Ropa** con categoría/subcategoría, precio, descripción.
- Inventario por **talla** (Unitalla, 25–28…), `stock_actual` vs `stock_minimo` → estados de stock bajo.
- Ventas con `staff`, `payment_method` (Efectivo/Tarjeta/Transferencia), delivery, cortesías (%), tickets/órdenes, fecha.
- Marca actual: primary `#F59A57` (naranja), bg `#F5F3F1`, accent teal `#00bfa6`, tipografía Inter.

## Dirección de diseño (Minimal Premium)

- Paleta off-white refinada: fondo `oklch` casi blanco cálido, superficies blanco puro, texto carbón, **naranja de marca conservado** como único acento saturado (respetando tu identidad), grises neutros con tinte consistente. Modo claro + oscuro real.
- Tipografía: Inter para UI, fuente mono para SKUs/tickets/montos. Escala condensada (12/13/14/16/20/24/32).
- Radios suaves 6–8px, sombras layered tipo Linear, spacing base 4px, hairlines en vez de bordes grises duros, sin zebra striping, iconos Lucide stroke 1.5, microinteracciones 150–200ms.

## Entregables por fase

**Fase 1 — Sistema de diseño**
Reescribir tokens en `src/styles.css` (paleta, sombras, radios, mono) conservando el naranja de marca. Variantes de botón/badge premium.

**Fase 2 — Shell y navegación**
Layout con sidebar colapsable (icon-mode), topbar delgada con breadcrumb, command palette (⌘K). Rutas TanStack: `/pos`, `/inventario`, `/dashboard`. Redirigir `/` al dashboard.

**Fase 3 — POS** (`/pos`)
Dos columnas: catálogo con búsqueda protagonista + filtros por categoría (Gorras/Calzado/Ropa) y selector de talla; ticket a la derecha con monoespaciado, totales jerarquizados, modal de cobro con segmented control de método de pago y atajos.

**Fase 4 — Inventario** (`/inventario`)
Tabla densa (40–44px, hairlines, sin zebra) con producto, talla, stock actual/mínimo y **dot indicators** de estado (ok / bajo / agotado). Filtros como chips, drawer lateral de detalle, barra flotante de bulk actions.

**Fase 5 — Dashboards** (`/dashboard`)
KPIs (ventas del periodo, ticket promedio, unidades, % cortesías) en cards minimalistas, gráficas (Recharts) con paleta restringida, bento grid, segmented control de periodo, top productos y desglose por método de pago/staff. Estados vacíos cuidados.

**Fase 6 — Pulido**
Login premium, toasts discretos, responsive, animaciones Motion.

## Detalles técnicos

- Stack destino aquí: TanStack Start + React + Tailwind v4 (tokens en `src/styles.css` con `oklch`) + shadcn/ui ya disponible + Recharts (`src/components/ui/chart.tsx`) + Motion.
- Datos: convierto `products.csv`, `inventory.csv`, `sales.csv` a un módulo seed en `src/data/` (TypeScript), sin backend. Todo en memoria/cliente.
- Nada de Lovable Cloud por ahora (es maqueta de presentación); si luego quieres persistencia real lo agregamos.
- Para portar a tu Electron: te dejo los tokens y el mapeo de clases para que repliques el look en Chakra, o evaluamos migrar el renderer a Tailwind.

## Pendiente para ti (no bloquea la maqueta)

Si quieres que el rediseño termine en tu repo real, después necesitarás **hacer push de tu carpeta `src/`** a GitHub o subir un ZIP que sí la contenga.
