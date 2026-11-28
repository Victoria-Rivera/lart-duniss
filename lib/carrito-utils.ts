export interface ProductoCarritoInput {
  id: number;
  nombre: string;
  precio_nuevo: number;
  stock: number;
}

export interface ItemCarrito extends ProductoCarritoInput {
  quantity: number;
}

export function calcularTotalCarrito(items: ItemCarrito[]): number {
  return items.reduce((acc, item) => acc + item.precio_nuevo * item.quantity, 0);
}

export function agregarProductoAlCarrito(
  carritoActual: ItemCarrito[],
  productoNuevo: ProductoCarritoInput
): { carrito: ItemCarrito[]; error?: string } {
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
    carrito: [...carritoActual, { ...productoNuevo, quantity: 1 }],
  };
}