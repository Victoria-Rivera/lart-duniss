"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ItemCarrito } from "../carrito/page";

const regionesBase = [
  { id: 13, nombre: "Región Metropolitana de Santiago" },
  { id: 5, nombre: "Región de Valparaíso" },
];

const comunasBase = [
  { id: 13101, id_region: 13, nombre: "Santiago" },
  { id: 13114, id_region: 13, nombre: "Las Condes" },
  { id: 13123, id_region: 13, nombre: "Providencia" },
  { id: 5101, id_region: 5, nombre: "Valparaíso" },
  { id: 5109, id_region: 5, nombre: "Viña del Mar" },
];

export default function ComprarPage() {
  const router = useRouter();
  const [comprados, setComprados] = useState<ItemCarrito[]>([]);
  const [regionId, setRegionId] = useState<number>(regionesBase[0].id);
  const [comunaId, setComunaId] = useState<number>(13101);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setComprados(saved);
  }, []);

  const comunasFiltradas = comunasBase.filter((c) => c.id_region === regionId);

  const handleRegionChange = (nextRegionId: number) => {
    setRegionId(nextRegionId);
    const primerasComunas = comunasBase.filter((c) => c.id_region === nextRegionId);
    if (primerasComunas.length > 0) {
      setComunaId(primerasComunas[0].id);
    }
  };

  const totalPago = comprados.reduce(
    (acc, item) => acc + item.precio_nuevo * item.quantity,
    0
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/comprar-ok");
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
                placeholder="Buscar productos..."
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
                      <strong>${totalPago.toLocaleString("es-CL")}</strong>
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
                <section id="productos-comprados" className="py-2 mb-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <h4 className="card-title fw-bold" style={{ color: "#343a40" }}>
                        Carrito de compra
                      </h4>
                      <p className="text-muted mb-0" style={{ color: "#495057" }}>
                        Revisa tus productos seleccionados
                      </p>
                    </div>
                    <div className="btn btn-outline-primary py-2 px-3 fs-6">
                      Total a pagar:{" "}
                      <strong>
                        <span id="totalPago">${totalPago.toLocaleString("es-CL")}</span>
                      </strong>
                    </div>
                  </div>

                  <div className="table-responsive mt-3">
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
                            <td colSpan={5} className="text-center text-muted py-4">
                              Tu carrito está vacío.
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
                </section>

                <hr className="my-4" />

                <form onSubmit={handleSubmit} className="row g-3">
                  <h4 className="card-title mb-1 fw-bold" style={{ color: "#343a40" }}>
                    Información del cliente
                  </h4>
                  <p className="text-muted" style={{ color: "#495057" }}>
                    Completa tus datos personales para el despacho
                  </p>

                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre<small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellidos" className="form-label">
                      Apellidos<small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellidos"
                      name="apellidos"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="correo" className="form-label">
                      Correo electrónico<small className="text-danger">*</small>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      name="correo"
                      required
                    />
                  </div>

                  <h4
                    className="card-title mt-4 mb-1 fw-bold"
                    style={{ color: "#343a40" }}
                  >
                    Dirección de entrega de los productos
                  </h4>
                  <p className="text-muted" style={{ color: "#495057" }}>
                    Ingrese dirección de forma detallada
                  </p>

                  <div className="col-md-6">
                    <label htmlFor="calle" className="form-label">
                      Calle<small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="calle"
                      name="calle"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="depto" className="form-label">
                      Departamento (opcional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="depto"
                      name="depto"
                      placeholder="Ej: 603"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="regionSelect" className="form-label">
                      Región<small className="text-danger">*</small>
                    </label>
                    <select
                      className="form-select"
                      id="regionSelect"
                      value={regionId}
                      onChange={(e) => handleRegionChange(Number(e.target.value))}
                      required
                    >
                      {regionesBase.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="comunaSelect" className="form-label">
                      Comuna<small className="text-danger">*</small>
                    </label>
                    <select
                      className="form-select"
                      id="comunaSelect"
                      value={comunaId}
                      onChange={(e) => setComunaId(Number(e.target.value))}
                      required
                    >
                      {comunasFiltradas.map((comuna) => (
                        <option key={comuna.id} value={comuna.id}>
                          {comuna.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="indicaciones" className="form-label">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control"
                      id="indicaciones"
                      rows={3}
                      placeholder="Ej.: Entre calles, color del edificio, timbre malo."
                    />
                  </div>

                  <div className="text-end mt-4">
                    <button type="submit" className="btn btn-success btn-lg px-5 py-3">
                      Pagar ahora{" "}
                      <span id="totalPagoBtn">
                        <strong>(${totalPago.toLocaleString("es-CL")})</strong>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}