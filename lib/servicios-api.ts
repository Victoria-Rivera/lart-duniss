import { apiFetch, guardarSesion } from "./api-client";

export interface ProductoFrontend {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  precio_descuento: number;
  precio_nuevo: number;
  stock: number;
}

interface ProductoBackend {
  id: number;
  nombre?: string;
  name?: string;
  categoria?: string;
  descripcion?: string;
  imagen?: string;
  precio?: number;
  precio_nuevo?: number;
  precioDescuento?: number;
  stock?: number;
}

function mapearProducto(p: ProductoBackend): ProductoFrontend {
  const precio = p.precio_nuevo ?? p.precio ?? 0;
  return {
    id: p.id,
    nombre: p.nombre ?? p.name ?? "Producto Artesanal",
    categoria: p.categoria ?? "Repostería",
    descripcion: p.descripcion ?? "Preparación artesanal de Lart_duniss.",
    imagen: p.imagen || `/assets/img/Pasteleria_${((p.id - 1) % 9) + 1}.jpg`,
    precio_descuento: p.precioDescuento ?? precio,
    precio_nuevo: precio,
    stock: p.stock ?? 10,
  };
}

// 1. Autenticación (rutas abiertas en el Gateway)
export async function loginUsuario(credenciales: {
  username?: string;
  email?: string;
  password: string;
}) {
  const data = await apiFetch<{
    token?: string;
    jwt?: string;
    accessToken?: string;
    usuario?: Record<string, unknown>;
  }>(
    "/api/v1/usuarios/login",
    {
      method: "POST",
      body: JSON.stringify(credenciales),
    },
    false
  );

  const token = data.token ?? data.jwt ?? data.accessToken;
  if (!token) {
    throw new Error("El servidor no devolvió un token JWT válido.");
  }

  guardarSesion(token, data.usuario);
  return data;
}

export async function registrarUsuario(datos: {
  username: string;
  email: string;
  password: string;
  rol?: string;
}) {
  return apiFetch(
    "/api/v1/usuarios/registrar",
    {
      method: "POST",
      body: JSON.stringify(datos),
    },
    false
  );
}

// 2. Productos (envía JWT automáticamente via apiFetch)
export async function obtenerProductos(): Promise<ProductoFrontend[]> {
  const lista = await apiFetch<ProductoBackend[]>("/api/v1/productos");
  return lista.map(mapearProducto);
}

export async function obtenerProductoPorId(
  id: string | number
): Promise<ProductoFrontend> {
  const item = await apiFetch<ProductoBackend>(`/api/v1/productos/${id}`);
  return mapearProducto(item);
}

// 3. Compra: Pedido + Pago
export async function procesarCompra(datosCompra: {
  clienteId?: number;
  total: number;
  metodoPago: string;
  items: { productoId: number; cantidad: number; precioUnitario: number }[];
}) {
  const pedido = await apiFetch<{ id: number }>("/api/v1/pedidos", {
    method: "POST",
    body: JSON.stringify({
      clienteId: datosCompra.clienteId ?? 1,
      total: datosCompra.total,
      estado: "PENDIENTE",
      detalles: datosCompra.items,
    }),
  });

  const pago = await apiFetch("/api/v1/pagos", {
    method: "POST",
    body: JSON.stringify({
      pedidoId: pedido.id,
      monto: datosCompra.total,
      metodoPago: datosCompra.metodoPago,
      estado: "APROBADO",
    }),
  });

  return { pedido, pago };
}