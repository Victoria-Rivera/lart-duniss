"use client";

import Link from "next/link";

export default function ComprarOkPage() {
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
          <h2 className="fw-bold mb-3" style={{ color: "#b02a65" }}>
            ¡Compra Confirmada!
          </h2>
          <p className="text-secondary mb-4">
            Tu pedido y pago fueron registrados correctamente en Lart_duniss.
            Pronto comenzaremos a preparar tu pedido artesanal.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link
              href="/categorias"
              className="btn btn-danger fw-bold px-4"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              Seguir explorando
            </Link>
            <Link href="/" className="btn btn-outline-secondary px-4">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}