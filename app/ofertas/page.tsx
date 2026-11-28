"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductos, type ProductoFrontend } from "@/lib/servicios-api";
import {
  agregarProductoAlCarrito,
  type ItemCarrito,
} from "@/lib/carrito-utils";

export default function OfertasPage() {
  const [productos, setProductos] = useState<ProductoFrontend[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  useEffect(() => {
    obtenerProductos()
      .then((lista) => {
        const enOferta = lista.filter(
          (p) => p.precio_descuento > p.precio_nuevo
        );
        setProductos(enOferta.length > 0 ? enOferta : lista);
      })
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar las ofertas."
        )
      )
      .finally(() => setCargando(false));
  }, []);

  const handleAgregar = (producto: ProductoFrontend) => {
    const carritoGuardado: ItemCarrito[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const { carrito, error: errorStock } = agregarProductoAlCarrito(
      carritoGuardado,
      {
        id: producto.id,
        nombre: producto.nombre,
        precio_nuevo: producto.precio_nuevo,
        stock: producto.stock,
      }
    );

    if (errorStock) {
      setMensajeCarrito(errorStock);
      return;
    }

    localStorage.setItem("cart", JSON.stringify(carrito));
    setMensajeCarrito(`"${producto.nombre}" agregado al carrito.`);
    setTimeout(() => setMensajeCarrito(""), 2500);
  };

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: "#b02a65" }}>
            Ofertas Especiales
          </h2>
          <Link href="/carrito" className="btn btn-success fw-bold">
            Ver Carrito
          </Link>
        </div>

        {mensajeCarrito && (
          <div className="alert alert-info py-2">{mensajeCarrito}</div>
        )}

        {cargando && (
          <p className="text-center fw-semibold" style={{ color: "#b02a65" }}>
            Cargando ofertas desde el backend...
          </p>
        )}

        {error && (
          <div className="alert alert-danger">
            <p className="mb-2">{error}</p>
            <Link
              href="/iniciar-sesion"
              className="btn btn-sm btn-outline-danger"
            >
              Iniciar Sesión
            </Link>
          </div>
        )}

        {!cargando && !error && (
          <div className="row g-4">
            {productos.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <span className="badge bg-warning text-dark mb-2">
                        Oferta • {producto.categoria}
                      </span>
                      <h5 className="fw-bold" style={{ color: "#b02a65" }}>
                        {producto.nombre}
                      </h5>
                      <p className="text-secondary small">
                        {producto.descripcion}
                      </p>
                    </div>

                    <div>
                      {producto.precio_descuento > producto.precio_nuevo && (
                        <div className="text-muted text-decoration-line-through small">
                          ${producto.precio_descuento.toLocaleString("es-CL")}
                        </div>
                      )}
                      <div
                        className="fs-5 fw-bold mb-2"
                        style={{ color: "#d63384" }}
                      >
                        ${producto.precio_nuevo.toLocaleString("es-CL")}
                      </div>
                      <div className="d-flex gap-2">
                        <Link
                          href={`/productos/${producto.id}`}
                          className="btn btn-outline-secondary btn-sm flex-fill"
                        >
                          Ver detalle
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleAgregar(producto)}
                          disabled={producto.stock <= 0}
                          className="btn btn-danger btn-sm flex-fill"
                          style={{
                            backgroundColor: "#e83e8c",
                            borderColor: "#e83e8c",
                          }}
                        >
                          {producto.stock > 0 ? "Añadir" : "Agotado"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}