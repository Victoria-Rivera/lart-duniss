"use client";

import Link from "next/link";
import type { ItemCarrito, ProductoTienda } from "../../carrito/page";

export default function BotonAgregarCarrito({
  producto,
}: {
  producto: ProductoTienda;
}) {
  const handleAdd = () => {
    const cart: ItemCarrito[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === producto.id);

    if (existing) {
      if (existing.quantity >= producto.stock) {
        alert(`No puedes añadir más de ${producto.stock} unidades de ${producto.nombre}.`);
        return;
      }
      existing.quantity += 1;
    } else {
      if (producto.stock <= 0) {
        alert(`Lo sentimos, ${producto.nombre} está agotado.`);
        return;
      }
      cart.push({ ...producto, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`¡Se añadió "${producto.nombre}" al carrito! 🛒`);
  };

  return (
    <div className="d-grid gap-2">
      <button
        type="button"
        className="btn btn-success btn-lg"
        disabled={producto.stock <= 0}
        onClick={handleAdd}
      >
        <i className="bi bi-cart-plus me-2"></i> Agregar al Carrito
      </button>
      <Link href="/categorias" className="btn btn-outline-secondary">
        Volver al catálogo
      </Link>
    </div>
  );
}