"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { calcularTotalCarrito, type ItemCarrito } from "@/lib/carrito-utils";
import { procesarCompra } from "@/lib/servicios-api";

export default function ComprarPage() {
  const router = useRouter();
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [metodoPago, setMetodoPago] = useState("TARJETA");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    try {
      const guardado: ItemCarrito[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setItems(guardado);
    } catch {
      setItems([]);
    }
  }, []);

  const total = calcularTotalCarrito(items);

  const handleConfirmarCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("No hay productos en el carrito.");
      return;
    }

    setProcesando(true);
    try {
      await procesarCompra({
        total,
        metodoPago,
        items: items.map((item) => ({
          productoId: item.id,
          cantidad: item.quantity,
          precioUnitario: item.precio_nuevo,
        })),
      });

      localStorage.removeItem("cart");
      router.push("/comprar-ok");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "No se pudo procesar el pedido o el pago.";
      setError(msg);
      localStorage.setItem("ultimoErrorCompra", msg);
      router.push("/comprar-error");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      <div className="container py-5" style={{ maxWidth: "680px" }}>
        <div
          className="card p-4 shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "#b02a65" }}>
            Finalizar Compra
          </h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {items.length === 0 ? (
            <div className="text-center py-3">
              <p className="text-secondary mb-3">
                Tu carrito está vacío. Agrega productos antes de comprar.
              </p>
              <Link href="/categorias" className="btn btn-danger fw-bold">
                Ir a Categorías
              </Link>
            </div>
          ) : (
            <form onSubmit={handleConfirmarCompra}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Dirección de Entrega
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Av. Pajaritos 1234, Maipú"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Método de Pago</label>
                <select
                  className="form-select"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="TARJETA">Tarjeta Débito / Crédito</option>
                  <option value="TRANSFERENCIA">Transferencia Bancaria</option>
                  <option value="EFECTIVO">Efectivo al recibir</option>
                </select>
              </div>

              <div className="border-top pt-3 mb-4">
                <h5 className="fw-bold mb-2">Detalle ({items.length} ítems)</h5>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between small mb-1"
                  >
                    <span>
                      {item.nombre} x{item.quantity}
                    </span>
                    <span>
                      $
                      {(item.precio_nuevo * item.quantity).toLocaleString(
                        "es-CL"
                      )}
                    </span>
                  </div>
                ))}
                <div className="d-flex justify-content-between fs-5 fw-bold mt-3">
                  <span>Total a pagar:</span>
                  <span style={{ color: "#d63384" }}>
                    ${total.toLocaleString("es-CL")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={procesando}
                className="btn btn-danger w-100 fw-bold"
                style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
              >
                {procesando ? "Procesando pedido y pago..." : "Confirmar Compra"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}