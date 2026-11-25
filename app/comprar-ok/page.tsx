"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ItemCarrito } from "../carrito/page";

const regionesOk = [
  { id: 13, nombre: "Región Metropolitana de Santiago" },
  { id: 5, nombre: "Región de Valparaíso" },
];

const comunasOk = [
  { id: 13121, id_region: 13, nombre: "Maipú" },
  { id: 13101, id_region: 13, nombre: "Santiago" },
  { id: 5101, id_region: 5, nombre: "Valparaíso" },
];

export default function ComprarOkPage() {
  const [comprados, setComprados] = useState<ItemCarrito[]>([]);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setComprados(saved);
  }, []);

  const totalCompra = comprados.reduce(
    (acc, item) => acc + item.precio_nuevo * item.quantity,
    0
  );

  const handleMensaje = (mensaje: string) => {
    setAviso(mensaje);
  };

  return (
    <div style={{ backgroundColor: "#ffa6ef", minHeight: "100vh", paddingBottom: "3rem" }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/assets/img/Banner.jpg"
              alt="Logo Lart_duniss"
              width={40}
              height={40}
              className="me-2 rounded-circle object-fit-cover"
            />
            <strong>Lart_duniss</strong>
          </Link>

          <div className="collapse navbar-collapse justify-content-center" id="navbarTopContent">
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          </div>

          <div className="d-flex">
            <Link href="/iniciar-sesion" className="btn btn-outline-primary ms-2">
              Iniciar Sesión
            </Link>
            <Link href="/crear-sesion" className="btn btn-primary ms-2">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg bg-body-tertiary d-none d-lg-block border-top border-bottom">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarBottomContent">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/categorias">
                  Categorías
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/ofertas">
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success ms-4" href="/carrito">
                  <strong>
                    <i className="bi bi-cart4"></i> Carrito{" "}
                    <span>
                      <strong>${totalCompra.toLocaleString("es-CL")}</strong>
                    </span>
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div
              className="card p-4"
              style={{
                backgroundColor: "#ffffff",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body">
                {aviso && (
                  <div className="alert alert-success text-center" role="alert">
                    {aviso}
                  </div>
                )}

                <section id="productos-comprados" className="py-2">
                  <div className="container">
                    <div className="text-end">
                      <small className="text-muted">
                        Código orden: <strong>ORDER-2026</strong>
                      </small>
                    </div>

                    <h3 className="card-title text-success my-3 fw-bold" style={{ color: "#343a40" }}>
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <span className="text-success">
                        ¡Se ha realizado la compra con éxito! Nro #20260428
                      </span>
                    </h3>

                    <div className="row g-3 mt-2">
                      <p className="text-muted">
                        Información del cliente y despacho registrado:
                      </p>

                      <div className="col-6 col-md-4">
                        <label htmlFor="nombre" className="form-label">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          defaultValue="Victoria"
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="col-6 col-md-4">
                        <label htmlFor="apellidos" className="form-label">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="apellidos"
                          defaultValue="Rivera"
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <label htmlFor="correo" className="form-label">
                          Correo
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="correo"
                          defaultValue="victoria@example.com"
                          disabled
                          readOnly
                        />
                      </div>

                      <h5 className="card-title mt-4 fw-bold" style={{ color: "#343a40" }}>
                        Dirección de entrega
                      </h5>

                      <div className="col-12 col-md-6">
                        <label className="form-label">Calle</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Av. Pajaritos, Maipú"
                          disabled
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Departamento (opcional)</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Depto 402"
                          disabled
                        />
                      </div>

                      <div className="col-6 col-md-6">
                        <label htmlFor="regionSelect" className="form-label">
                          Región
                        </label>
                        <select
                          className="form-select"
                          id="regionSelect"
                          defaultValue={13}
                          disabled
                        >
                          {regionesOk.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 col-md-6">
                        <label htmlFor="comunaSelect" className="form-label">
                          Comuna
                        </label>
                        <select
                          className="form-select"
                          id="comunaSelect"
                          defaultValue={13121}
                          disabled
                        >
                          {comunasOk.map((comuna) => (
                            <option key={comuna.id} value={comuna.id}>
                              {comuna.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label">
                          Indicaciones para la entrega
                        </label>
                        <textarea
                          className="form-control"
                          rows={2}
                          defaultValue="Dejar en conserjería si no hay moradores."
                          disabled
                        />
                      </div>
                    </div>

                    <div className="table-responsive mt-4">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody id="comprados-list">
                          {comprados.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center text-muted py-3">
                                No hay productos en esta orden.
                              </td>
                            </tr>
                          ) : (
                            comprados.map((item) => {
                              const itemTotal = item.precio_nuevo * item.quantity;
                              return (
                                <tr key={item.id}>
                                  <td>
                                    <img
                                      src={item.imagen}
                                      alt={item.nombre}
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                      }}
                                      className="rounded"
                                    />
                                  </td>
                                  <td>{item.nombre}</td>
                                  <td>${item.precio_nuevo.toLocaleString("es-CL")}</td>
                                  <td>{item.quantity}</td>
                                  <td>${itemTotal.toLocaleString("es-CL")}</td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-center my-4">
                      <div className="card bg-light border-success">
                        <div className="card-body py-3">
                          <h4 className="card-title mb-0 text-success fw-bold">
                            Total pagado: ${" "}
                            <span id="totalCompra">
                              <strong>{totalCompra.toLocaleString("es-CL")}</strong>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="text-center d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() =>
                          handleMensaje("Boleta descargada en PDF con éxito")
                        }
                      >
                        <i className="bi bi-file-earmark-pdf"></i> Imprimir boleta en
                        PDF
                      </button>
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() =>
                          handleMensaje("Se ha enviado la boleta por correo electrónico")
                        }
                      >
                        <i className="bi bi-envelope"></i> Enviar boleta por email
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}