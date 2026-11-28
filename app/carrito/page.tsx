"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  agregarProductoAlCarrito,
  calcularTotalCarrito,
  type ItemCarrito,
} from "@/lib/carrito-utils";

export default function CarritoPage() {
  const router = useRouter();
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [errorStock, setErrorStock] = useState("");
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const guardado: ItemCarrito[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setItems(guardado);
    } catch {
      setItems([]);
    } finally {
      setCargado(true);
    }
  }, []);

  const actualizarStorage = (nuevoCarrito: ItemCarrito[]) => {
    setItems(nuevoCarrito);
    localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
  };

  const handleIncrementar = (item: ItemCarrito) => {
    setErrorStock("");
    const { carrito, error } = agregarProductoAlCarrito(items, {
      id: item.id,
      nombre: item.nombre,
      precio_nuevo: item.precio_nuevo,
      stock: item.stock,
    });

    if (error) {
      setErrorStock(error);
      return;
    }

    actualizarStorage(carrito);
  };

  const handleDecrementar = (id: number) => {
    setErrorStock("");
    const actualizado = items
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    actualizarStorage(actualizado);
  };

  const handleEliminar = (id: number) => {
    setErrorStock("");
    actualizarStorage(items.filter((item) => item.id !== id));
  };

  const total = calcularTotalCarrito(items);

  if (!cargado) {
    return (
      <div className="container py-5 text-center">
        <p className="fw-semibold" style={{ color: "#b02a65" }}>
          Cargando carrito...
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: "#b02a65" }}>
            Tu Carrito de Compras
          </h2>
          <Link href="/categorias" className="btn btn-outline-danger btn-sm">
            Seguir comprando
          </Link>
        </div>

        {errorStock && (
          <div className="alert alert-warning py-2">{errorStock}</div>
        )}

        {items.length === 0 ? (
          <div className="card p-5 text-center shadow-sm border-0">
            <h4 className="fw-bold mb-3" style={{ color: "#b02a65" }}>
              Tu carrito está vacío
            </h4>
            <p className="text-secondary mb-4">
              Explora nuestras tortas, galletas y preparaciones artesanales.
            </p>
            <div>
              <Link
                href="/categorias"
                className="btn btn-danger fw-bold px-4"
                style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card p-3 shadow-sm border-0">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex flex-wrap justify-content-between align-items-center border-bottom py-3 gap-3"
                  >
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: "#b02a65" }}>
                        {item.nombre}
                      </h5>
                      <div className="text-secondary small">
                        Precio unitario: $
                        {item.precio_nuevo.toLocaleString("es-CL")} | Stock
                        máx.: {item.stock}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrementar(item.id)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        -
                      </button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrementar(item)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEliminar(item.id)}
                        className="btn btn-outline-danger btn-sm ms-2"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="fw-bold" style={{ color: "#d63384" }}>
                      $
                      {(item.precio_nuevo * item.quantity).toLocaleString(
                        "es-CL"
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card p-4 shadow-sm border-0">
                <h4 className="fw-bold mb-3" style={{ color: "#b02a65" }}>
                  Resumen del Pedido
                </h4>
                <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                  <span>Total:</span>
                  <span style={{ color: "#d63384" }}>
                    ${total.toLocaleString("es-CL")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/comprar")}
                  className="btn btn-danger w-100 fw-bold"
                  style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
                >
                  Continuar a la Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}