"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { obtenerProductoPorId, type ProductoFrontend } from "@/lib/servicios-api";
import BotonAgregarCarrito from "../botonAgregarCarrito/page";

export default function ProductoDinamicoPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [producto, setProducto] = useState<ProductoFrontend | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    obtenerProductoPorId(id)
      .then((data) => setProducto(data))
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "No se pudo cargar el producto."
        )
      )
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="container my-5 text-center">
        <p className="fw-semibold" style={{ color: "#b02a65" }}>
          Cargando producto desde el servidor...
        </p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container my-5 text-center">
        <h2 className="fw-bold text-danger">Producto no encontrado</h2>
        <p className="text-muted">
          {error || `No se pudo cargar el producto #${id}.`}
        </p>
        <p className="small text-secondary">
          Asegúrate de haber iniciado sesión y de tener el API Gateway corriendo en el puerto 9090.
        </p>
        <Link href="/iniciar-sesion" className="btn btn-outline-danger me-2">
          Iniciar Sesión
        </Link>
        <Link href="/categorias" className="btn btn-primary">
          Volver a Categorías
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh", padding: "3rem 0" }}>
      <div className="container">
        <div className="card p-4 shadow-sm">
          <div className="row align-items-center g-4">
            <div className="col-md-6 text-center">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <span className="badge bg-light text-dark mb-2">
                {producto.categoria}
              </span>
              <h1 className="fw-bold" style={{ color: "#b02a65" }}>
                {producto.nombre}
              </h1>
              {producto.precio_descuento > producto.precio_nuevo && (
                <div className="text-muted text-decoration-line-through">
                  ${producto.precio_descuento.toLocaleString("es-CL")}
                </div>
              )}
              <div className="fs-3 fw-bold mb-2" style={{ color: "#d63384" }}>
                ${producto.precio_nuevo.toLocaleString("es-CL")}
              </div>
              <p className="mb-3">
                <strong>¿Hay en stock?:</strong>{" "}
                {producto.stock > 0 ? `Sí (${producto.stock} disponibles)` : "No"}
              </p>
              <p className="text-secondary mb-4">{producto.descripcion}</p>

              <BotonAgregarCarrito producto={producto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}