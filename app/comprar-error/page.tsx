"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ComprarErrorPage() {
  const [detalleError, setDetalleError] = useState("");

  useEffect(() => {
    const guardado = localStorage.getItem("ultimoErrorCompra");
    if (guardado) {
      setDetalleError(guardado);
      localStorage.removeItem("ultimoErrorCompra");
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}
      className="d-flex align-items-center py-5"
    >
      <div className="container" style={{ maxWidth: "560px" }}>
        <div
          className="card p-5 text-center shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <h2 className="fw-bold text-danger mb-3">
            No se pudo completar la compra
          </h2>
          <p className="text-secondary mb-3">
            Ocurrió un problema al procesar tu pedido o pago. Revisa tu sesión o
            intenta nuevamente.
          </p>
          {detalleError && (
            <div className="alert alert-danger small text-start mb-4">
              {detalleError}
            </div>
          )}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link
              href="/comprar"
              className="btn btn-danger fw-bold px-4"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              Reintentar compra
            </Link>
            <Link href="/carrito" className="btn btn-outline-secondary px-4">
              Volver al carrito
            </Link>
            <Link href="/iniciar-sesion" className="btn btn-outline-danger px-4">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}