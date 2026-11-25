// lib/carrito-utils.ts
export interface ItemCarritoBase {
  id: number;
  nombre: string;
  precio_nuevo: number;
  stock: number;
  quantity: number;
}

export function calcularTotalCarrito(items: ItemCarritoBase[]): number {
  return items.reduce((acc, item) => acc + item.precio_nuevo * item.quantity, 0);
}

export function agregarProductoAlCarrito<T extends ItemCarritoBase>(
  carritoActual: T[],
  productoNuevo: Omit<T, "quantity">
): { carrito: T[]; error?: string } {
  if (productoNuevo.stock <= 0) {
    return {
      carrito: carritoActual,
      error: `Lo sentimos, ${productoNuevo.nombre} está agotado.`,
    };
  }

  const existente = carritoActual.find((item) => item.id === productoNuevo.id);
  if (existente) {
    if (existente.quantity >= productoNuevo.stock) {
      return {
        carrito: carritoActual,
        error: `No puedes añadir más de ${productoNuevo.stock} unidades de ${productoNuevo.nombre}.`,
      };
    }
    return {
      carrito: carritoActual.map((item) =>
        item.id === productoNuevo.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
  }

  return {
    carrito: [...carritoActual, { ...productoNuevo, quantity: 1 } as T],
  };
}