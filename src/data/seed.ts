// Datos semilla derivados de los CSVs reales de Flux-Ops (products/inventory/sales).
// Maqueta de presentación — sin backend.

export type Product = {
  id: number; category: string; subcategory: string;
  nombre: string; precio: number; descripcion: string;
};
export type InventoryItem = {
  id: number; nombre: string; talla: string; unidad: string;
  stock_actual: number; stock_minimo: number;
};
export type Sale = {
  id: number; order_id: string; ticket_id: string; product_id: number;
  product_nombre: string; talla: string; staff_nombre: string;
  cantidad: number; total: number; courtesy_percent: number;
  order_name: string; payment_method: string; ticket: string; created_at: string;
};

export const products: Product[] = [
  {
    "id": 1,
    "category": "Gorras",
    "subcategory": "Unisex",
    "nombre": "Gorra Snapback Classic",
    "precio": 450.0,
    "descripcion": "Gorra snapback ajustable con logo frontal"
  },
  {
    "id": 2,
    "category": "Gorras",
    "subcategory": "Unisex",
    "nombre": "Gorra Trucker Mesh",
    "precio": 420.0,
    "descripcion": "Gorra estilo trucker con malla trasera"
  },
  {
    "id": 3,
    "category": "Gorras",
    "subcategory": "Unisex",
    "nombre": "Gorra Beisbol Básica",
    "precio": 350.0,
    "descripcion": "Gorra clásica de béisbol con cierre ajustable"
  },
  {
    "id": 4,
    "category": "Gorras",
    "subcategory": "Unisex",
    "nombre": "Gorra Visera Plana Urban",
    "precio": 480.0,
    "descripcion": "Gorra urbana con visera plana y diseño minimal"
  },
  {
    "id": 5,
    "category": "Gorras",
    "subcategory": "Unisex",
    "nombre": "Gorra Vintage Denim",
    "precio": 500.0,
    "descripcion": "Gorra estilo vintage en denim"
  },
  {
    "id": 6,
    "category": "Gorras",
    "subcategory": "Deportiva",
    "nombre": "Gorra Running Light",
    "precio": 380.0,
    "descripcion": "Gorra ligera para deporte y running"
  },
  {
    "id": 7,
    "category": "Gorras",
    "subcategory": "Premium",
    "nombre": "Gorra Lana Premium",
    "precio": 550.0,
    "descripcion": "Gorra de lana para clima frío con forro interior"
  },
  {
    "id": 8,
    "category": "Gorras",
    "subcategory": "Casual",
    "nombre": "Gorra Logo Patch",
    "precio": 400.0,
    "descripcion": "Gorra con parche de logo en el frente"
  },
  {
    "id": 9,
    "category": "Calzado",
    "subcategory": "Deportivos",
    "nombre": "Tenis Runner X",
    "precio": 2200.0,
    "descripcion": "Tenis de running con amortiguación avanzada"
  },
  {
    "id": 10,
    "category": "Calzado",
    "subcategory": "Deportivos",
    "nombre": "Tenis Sport Pro",
    "precio": 2500.0,
    "descripcion": "Tenis para entrenamiento y uso diario"
  },
  {
    "id": 11,
    "category": "Calzado",
    "subcategory": "Casual",
    "nombre": "Tenis Urban Lite",
    "precio": 1800.0,
    "descripcion": "Tenis urbanos con suela ligera"
  },
  {
    "id": 12,
    "category": "Calzado",
    "subcategory": "Trail",
    "nombre": "Tenis Trail Master",
    "precio": 2400.0,
    "descripcion": "Tenis para trail con mayor agarre"
  },
  {
    "id": 13,
    "category": "Calzado",
    "subcategory": "Classic",
    "nombre": "Tenis Classic 01",
    "precio": 1600.0,
    "descripcion": "Tenis clásico de uso diario"
  },
  {
    "id": 14,
    "category": "Calzado",
    "subcategory": "Comfort",
    "nombre": "Tenis Comfort Plus",
    "precio": 2000.0,
    "descripcion": "Tenis con plantilla acolchonada para confort"
  },
  {
    "id": 15,
    "category": "Calzado",
    "subcategory": "Performance",
    "nombre": "Tenis Velocity Pro",
    "precio": 2300.0,
    "descripcion": "Tenis de alta respuesta para corredores"
  },
  {
    "id": 16,
    "category": "Calzado",
    "subcategory": "Minimal",
    "nombre": "Tenis Minimal Light",
    "precio": 1750.0,
    "descripcion": "Tenis de peso ligero y diseño minimalista"
  },
  {
    "id": 17,
    "category": "Accesorios",
    "subcategory": "Calcetines",
    "nombre": "Pack Calcetines Sport",
    "precio": 150.0,
    "descripcion": "Pack de 3 pares de calcetines deportivos"
  },
  {
    "id": 18,
    "category": "Accesorios",
    "subcategory": "Cordones",
    "nombre": "Cordones Refuerzo",
    "precio": 120.0,
    "descripcion": "Cordones resistentes para calzado deportivo"
  },
  {
    "id": 19,
    "category": "Accesorios",
    "subcategory": "Gorras",
    "nombre": "Gorro Beanie",
    "precio": 300.0,
    "descripcion": "Gorro de punto calentito para invierno"
  },
  {
    "id": 20,
    "category": "Accesorios",
    "subcategory": "Bolsas",
    "nombre": "Bolsa Tote Logo",
    "precio": 350.0,
    "descripcion": "Bolsa tote de tela con logo serigrafiado"
  }
];
export const inventory: InventoryItem[] = [
  {
    "id": 1,
    "nombre": "Gorra Snapback Classic",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 4,
    "stock_minimo": 5
  },
  {
    "id": 2,
    "nombre": "Gorra Trucker Mesh",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 40,
    "stock_minimo": 5
  },
  {
    "id": 3,
    "nombre": "Gorra Beisbol Basica",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 60,
    "stock_minimo": 5
  },
  {
    "id": 4,
    "nombre": "Gorra Visera Plana Urban",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 30,
    "stock_minimo": 3
  },
  {
    "id": 5,
    "nombre": "Gorra Vintage Denim",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 20,
    "stock_minimo": 2
  },
  {
    "id": 6,
    "nombre": "Gorra Running Light",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 70,
    "stock_minimo": 10
  },
  {
    "id": 7,
    "nombre": "Gorra Lana Premium",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 15,
    "stock_minimo": 2
  },
  {
    "id": 8,
    "nombre": "Gorra Logo Patch",
    "talla": "Unitalla",
    "unidad": "pcs",
    "stock_actual": 45,
    "stock_minimo": 5
  },
  {
    "id": 9,
    "nombre": "Tenis Runner X",
    "talla": "25",
    "unidad": "pcs",
    "stock_actual": 10,
    "stock_minimo": 3
  },
  {
    "id": 10,
    "nombre": "Tenis Runner X",
    "talla": "26",
    "unidad": "pcs",
    "stock_actual": 25,
    "stock_minimo": 3
  },
  {
    "id": 11,
    "nombre": "Tenis Runner X",
    "talla": "27",
    "unidad": "pcs",
    "stock_actual": 18,
    "stock_minimo": 3
  },
  {
    "id": 12,
    "nombre": "Tenis Runner X",
    "talla": "28",
    "unidad": "pcs",
    "stock_actual": 9,
    "stock_minimo": 2
  },
  {
    "id": 13,
    "nombre": "Tenis Sport Pro",
    "talla": "25",
    "unidad": "pcs",
    "stock_actual": 6,
    "stock_minimo": 2
  },
  {
    "id": 14,
    "nombre": "Tenis Sport Pro",
    "talla": "26",
    "unidad": "pcs",
    "stock_actual": 4,
    "stock_minimo": 2
  },
  {
    "id": 15,
    "nombre": "Tenis Sport Pro",
    "talla": "27",
    "unidad": "pcs",
    "stock_actual": 2,
    "stock_minimo": 2
  },
  {
    "id": 16,
    "nombre": "Tenis Sport Pro",
    "talla": "28",
    "unidad": "pcs",
    "stock_actual": 3,
    "stock_minimo": 2
  },
  {
    "id": 17,
    "nombre": "Tenis Urban Lite",
    "talla": "24",
    "unidad": "pcs",
    "stock_actual": 15,
    "stock_minimo": 5
  },
  {
    "id": 18,
    "nombre": "Tenis Urban Lite",
    "talla": "25",
    "unidad": "pcs",
    "stock_actual": 40,
    "stock_minimo": 5
  },
  {
    "id": 19,
    "nombre": "Tenis Urban Lite",
    "talla": "26",
    "unidad": "pcs",
    "stock_actual": 32,
    "stock_minimo": 5
  },
  {
    "id": 20,
    "nombre": "Tenis Urban Lite",
    "talla": "27",
    "unidad": "pcs",
    "stock_actual": 20,
    "stock_minimo": 4
  }
];
export const sales: Sale[] = [
  {
    "id": 1,
    "order_id": "ORD-1001",
    "ticket_id": "TCK-5001",
    "product_id": 1,
    "product_nombre": "Gorra Snapback Classic",
    "talla": "Unitalla",
    "staff_nombre": "Juan Perez",
    "cantidad": 2,
    "total": 900.0,
    "courtesy_percent": 0.0,
    "order_name": "Mostrador",
    "payment_method": "Efectivo",
    "ticket": "A001",
    "created_at": "01/05/2026 10:15"
  },
  {
    "id": 2,
    "order_id": "ORD-1002",
    "ticket_id": "TCK-5002",
    "product_id": 3,
    "product_nombre": "Gorra Beisbol Bsica",
    "talla": "Unitalla",
    "staff_nombre": "Maria Lopez",
    "cantidad": 1,
    "total": 350.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido Uber",
    "payment_method": "Tarjeta",
    "ticket": "A002",
    "created_at": "01/05/2026 12:48"
  },
  {
    "id": 3,
    "order_id": "ORD-1003",
    "ticket_id": "TCK-5003",
    "product_id": 5,
    "product_nombre": "Gorra Vintage Denim",
    "talla": "Unitalla",
    "staff_nombre": "Carlos Ruiz",
    "cantidad": 1,
    "total": 500.0,
    "courtesy_percent": 10.0,
    "order_name": "Cliente Frecuente",
    "payment_method": "Transferencia",
    "ticket": "A003",
    "created_at": "02/05/2026 14:22"
  },
  {
    "id": 4,
    "order_id": "ORD-1004",
    "ticket_id": "TCK-5004",
    "product_id": 2,
    "product_nombre": "Gorra Trucker Mesh",
    "talla": "Unitalla",
    "staff_nombre": "Fernanda Diaz",
    "cantidad": 3,
    "total": 1260.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido App",
    "payment_method": "Tarjeta",
    "ticket": "A004",
    "created_at": "02/05/2026 16:09"
  },
  {
    "id": 5,
    "order_id": "ORD-1005",
    "ticket_id": "TCK-5005",
    "product_id": 6,
    "product_nombre": "Gorra Running Light",
    "talla": "Unitalla",
    "staff_nombre": "Juan Perez",
    "cantidad": 2,
    "total": 760.0,
    "courtesy_percent": 5.0,
    "order_name": "Venta Local",
    "payment_method": "Efectivo",
    "ticket": "A005",
    "created_at": "03/05/2026 09:11"
  },
  {
    "id": 6,
    "order_id": "ORD-1006",
    "ticket_id": "TCK-5006",
    "product_id": 7,
    "product_nombre": "Gorra Lana Premium",
    "talla": "Unitalla",
    "staff_nombre": "Daniela Cruz",
    "cantidad": 1,
    "total": 550.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido WhatsApp",
    "payment_method": "Transferencia",
    "ticket": "A006",
    "created_at": "03/05/2026 18:33"
  },
  {
    "id": 7,
    "order_id": "ORD-1007",
    "ticket_id": "TCK-5007",
    "product_id": 4,
    "product_nombre": "Gorra Visera Plana Urban",
    "talla": "Unitalla",
    "staff_nombre": "Maria Lopez",
    "cantidad": 2,
    "total": 960.0,
    "courtesy_percent": 0.0,
    "order_name": "Mostrador",
    "payment_method": "Tarjeta",
    "ticket": "A007",
    "created_at": "04/05/2026 11:05"
  },
  {
    "id": 8,
    "order_id": "ORD-1008",
    "ticket_id": "TCK-5008",
    "product_id": 1,
    "product_nombre": "Gorra Snapback Classic",
    "talla": "Unitalla",
    "staff_nombre": "Carlos Ruiz",
    "cantidad": 1,
    "total": 450.0,
    "courtesy_percent": 15.0,
    "order_name": "Promocin Influencer",
    "payment_method": "Efectivo",
    "ticket": "A008",
    "created_at": "04/05/2026 13:55"
  },
  {
    "id": 9,
    "order_id": "ORD-1009",
    "ticket_id": "TCK-5009",
    "product_id": 2,
    "product_nombre": "Gorra Trucker Mesh",
    "talla": "Unitalla",
    "staff_nombre": "Fernanda Diaz",
    "cantidad": 4,
    "total": 1680.0,
    "courtesy_percent": 0.0,
    "order_name": "Compra Evento",
    "payment_method": "Tarjeta",
    "ticket": "A009",
    "created_at": "05/05/2026 15:27"
  },
  {
    "id": 10,
    "order_id": "ORD-1010",
    "ticket_id": "TCK-5010",
    "product_id": 6,
    "product_nombre": "Gorra Running Light",
    "talla": "Unitalla",
    "staff_nombre": "Juan Perez",
    "cantidad": 1,
    "total": 380.0,
    "courtesy_percent": 0.0,
    "order_name": "Delivery Express",
    "payment_method": "Efectivo",
    "ticket": "A010",
    "created_at": "05/05/2026 19:44"
  },
  {
    "id": 11,
    "order_id": "ORD-1011",
    "ticket_id": "TCK-5011",
    "product_id": 5,
    "product_nombre": "Gorra Vintage Denim",
    "talla": "Unitalla",
    "staff_nombre": "Daniela Cruz",
    "cantidad": 2,
    "total": 1000.0,
    "courtesy_percent": 20.0,
    "order_name": "Cortesa Sponsor",
    "payment_method": "Transferencia",
    "ticket": "A011",
    "created_at": "06/05/2026 10:30"
  },
  {
    "id": 12,
    "order_id": "ORD-1012",
    "ticket_id": "TCK-5012",
    "product_id": 7,
    "product_nombre": "Gorra Lana Premium",
    "talla": "Unitalla",
    "staff_nombre": "Maria Lopez",
    "cantidad": 1,
    "total": 550.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido Facebook",
    "payment_method": "Tarjeta",
    "ticket": "A012",
    "created_at": "06/05/2026 17:12"
  },
  {
    "id": 13,
    "order_id": "ORD-1013",
    "ticket_id": "TCK-5013",
    "product_id": 3,
    "product_nombre": "Gorra Beisbol Basica",
    "talla": "Unitalla",
    "staff_nombre": "Fernanda Diaz",
    "cantidad": 2,
    "total": 700.0,
    "courtesy_percent": 0.0,
    "order_name": "Venta Local",
    "payment_method": "Efectivo",
    "ticket": "A013",
    "created_at": "07/05/2026 12:01"
  },
  {
    "id": 14,
    "order_id": "ORD-1014",
    "ticket_id": "TCK-5014",
    "product_id": 4,
    "product_nombre": "Gorra Visera Plana Urban",
    "talla": "Unitalla",
    "staff_nombre": "Carlos Ruiz",
    "cantidad": 1,
    "total": 480.0,
    "courtesy_percent": 5.0,
    "order_name": "Pedido Instagram",
    "payment_method": "Tarjeta",
    "ticket": "A014",
    "created_at": "07/05/2026 20:18"
  },
  {
    "id": 15,
    "order_id": "ORD-1015",
    "ticket_id": "TCK-5015",
    "product_id": 1,
    "product_nombre": "Gorra Snapback Classic",
    "talla": "Unitalla",
    "staff_nombre": "Juan Perez",
    "cantidad": 5,
    "total": 2250.0,
    "courtesy_percent": 0.0,
    "order_name": "Compra Mayoreo",
    "payment_method": "Transferencia",
    "ticket": "A015",
    "created_at": "08/05/2026 09:45"
  },
  {
    "id": 16,
    "order_id": "ORD-1016",
    "ticket_id": "TCK-5016",
    "product_id": 8,
    "product_nombre": "Tenis Urban Street",
    "talla": "25",
    "staff_nombre": "Juan Perez",
    "cantidad": 1,
    "total": 1250.0,
    "courtesy_percent": 0.0,
    "order_name": "Venta Mostrador",
    "payment_method": "Tarjeta",
    "ticket": "A016",
    "created_at": "08/05/2026 11:15"
  },
  {
    "id": 17,
    "order_id": "ORD-1017",
    "ticket_id": "TCK-5017",
    "product_id": 9,
    "product_nombre": "Tenis Runner Pro",
    "talla": "26",
    "staff_nombre": "Maria Lopez",
    "cantidad": 2,
    "total": 3200.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido App",
    "payment_method": "Transferencia",
    "ticket": "A017",
    "created_at": "08/05/2026 14:20"
  },
  {
    "id": 18,
    "order_id": "ORD-1018",
    "ticket_id": "TCK-5018",
    "product_id": 10,
    "product_nombre": "Tenis Casual White",
    "talla": "27",
    "staff_nombre": "Fernanda Diaz",
    "cantidad": 1,
    "total": 1450.0,
    "courtesy_percent": 5.0,
    "order_name": "Cliente Frecuente",
    "payment_method": "Efectivo",
    "ticket": "A018",
    "created_at": "09/05/2026 10:08"
  },
  {
    "id": 19,
    "order_id": "ORD-1019",
    "ticket_id": "TCK-5019",
    "product_id": 11,
    "product_nombre": "Tenis High Top Retro",
    "talla": "28",
    "staff_nombre": "Carlos Ruiz",
    "cantidad": 1,
    "total": 1800.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido Instagram",
    "payment_method": "Tarjeta",
    "ticket": "A019",
    "created_at": "09/05/2026 13:42"
  },
  {
    "id": 20,
    "order_id": "ORD-1020",
    "ticket_id": "TCK-5020",
    "product_id": 12,
    "product_nombre": "Tenis Skate Black",
    "talla": "28",
    "staff_nombre": "Daniela Cruz",
    "cantidad": 3,
    "total": 4200.0,
    "courtesy_percent": 10.0,
    "order_name": "Compra Evento",
    "payment_method": "Transferencia",
    "ticket": "A020",
    "created_at": "09/05/2026 18:55"
  },
  {
    "id": 21,
    "order_id": "ORD-1021",
    "ticket_id": "TCK-5021",
    "product_id": 8,
    "product_nombre": "Tenis Urban Street",
    "talla": "25",
    "staff_nombre": "Juan Perez",
    "cantidad": 2,
    "total": 2500.0,
    "courtesy_percent": 0.0,
    "order_name": "Delivery Express",
    "payment_method": "Efectivo",
    "ticket": "A021",
    "created_at": "10/05/2026 09:17"
  },
  {
    "id": 22,
    "order_id": "ORD-1022",
    "ticket_id": "TCK-5022",
    "product_id": 13,
    "product_nombre": "Tenis Flex",
    "talla": "26",
    "staff_nombre": "Maria Lopez",
    "cantidad": 10,
    "total": 1600.0,
    "courtesy_percent": 0.0,
    "order_name": "Venta Local",
    "payment_method": "Tarjeta",
    "ticket": "A022",
    "created_at": "10/05/2026 12:33"
  },
  {
    "id": 25,
    "order_id": "ORD-1025",
    "ticket_id": "TCK-5025",
    "product_id": 9,
    "product_nombre": "Tenis Runner Pro",
    "talla": "26",
    "staff_nombre": "Daniela Cruz",
    "cantidad": 1,
    "total": 1600.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido WhatsApp",
    "payment_method": "Tarjeta",
    "ticket": "A025",
    "created_at": "11/05/2026 14:09"
  },
  {
    "id": 26,
    "order_id": "ORD-1026",
    "ticket_id": "TCK-5026",
    "product_id": 12,
    "product_nombre": "Tenis Skate Black",
    "talla": "28",
    "staff_nombre": "Juan Perez",
    "cantidad": 2,
    "total": 2800.0,
    "courtesy_percent": 20.0,
    "order_name": "Patrocinio Evento",
    "payment_method": "Transferencia",
    "ticket": "A026",
    "created_at": "11/05/2026 19:36"
  },
  {
    "id": 27,
    "order_id": "ORD-1027",
    "ticket_id": "TCK-5027",
    "product_id": 13,
    "product_nombre": "Tenis Sport Flex",
    "talla": "26",
    "staff_nombre": "Maria Lopez",
    "cantidad": 3,
    "total": 4800.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido Web",
    "payment_method": "Efectivo",
    "ticket": "A027",
    "created_at": "12/05/2026 10:51"
  },
  {
    "id": 28,
    "order_id": "ORD-1028",
    "ticket_id": "TCK-5028",
    "product_id": 11,
    "product_nombre": "Tenis High Top Retro",
    "talla": "28",
    "staff_nombre": "Fernanda Diaz",
    "cantidad": 1,
    "total": 1800.0,
    "courtesy_percent": 5.0,
    "order_name": "Venta Sucursal",
    "payment_method": "Tarjeta",
    "ticket": "A028",
    "created_at": "12/05/2026 15:14"
  },
  {
    "id": 29,
    "order_id": "ORD-1029",
    "ticket_id": "TCK-5029",
    "product_id": 14,
    "product_nombre": "Tenis Premium Gold",
    "talla": "27",
    "staff_nombre": "Carlos Ruiz",
    "cantidad": 2,
    "total": 5200.0,
    "courtesy_percent": 0.0,
    "order_name": "Pedido Corporativo",
    "payment_method": "Transferencia",
    "ticket": "A029",
    "created_at": "12/05/2026 20:07"
  }
];
