"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function PedidosEspeciales() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [contactoCliente, setContactoCliente] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [tematica, setTematica] = useState("");
  const [detallesIdea, setDetallesIdea] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !nombreCliente.trim() ||
      !contactoCliente.trim() ||
      !tipoProducto ||
      !tematica.trim() ||
      !detallesIdea.trim()
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setEnviado(true);
    setNombreCliente("");
    setContactoCliente("");
    setTipoProducto("");
    setTematica("");
    setDetallesIdea("");
  };

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      {/* Navbar Superior */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(214, 51, 132, 0.08)",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/assets/img/Banner.jpg"
              alt="Logo Lart_duniss"
              width={40}
              height={40}
              className="d-inline-block align-text-top rounded-circle me-2 object-fit-cover"
            />
            <strong style={{ color: "#b02a65" }}>Lart_duniss</strong>
          </Link>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarTopContent"
          >
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar delicias..."
                aria-label="Buscar"
              />
              <button className="btn btn-outline-danger" type="submit">
                Buscar
              </button>
            </form>
          </div>

          <div className="d-flex align-items-center">
            <Link href="/iniciar-sesion" className="btn btn-outline-danger ms-2">
              Iniciar Sesión
            </Link>
            <Link
              href="/crear-sesion"
              className="btn btn-danger ms-2"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </nav>

      {/* Navbar Inferior */}
      <nav
        className="navbar navbar-expand-lg d-none d-lg-block border-top"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarBottomContent"
          >
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
                <Link className="nav-link" href="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-danger fw-bold"
                  href="/pedidos-especiales"
                >
                  Pedidos Especiales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success ms-5" href="/carrito">
                  <strong>
                    <i className="bi bi-cart4"></i> Carrito
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Formulario de Pedido Especial */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4 p-md-5"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f8d7da",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.04)",
                borderRadius: "15px",
              }}
            >
              <h2
                className="text-center mb-3 fw-bold"
                style={{ color: "#b02a65" }}
              >
                Diseña tu Pedido Especial
              </h2>
              <p className="text-center text-muted mb-4">
                ¿Tienes una temática en mente, un personaje favorito o un evento
                especial? Cuéntanos tu idea y la hacemos realidad con el toque
                dulce de Lart_duniss.
              </p>

              {enviado && (
                <div className="alert alert-success text-center" role="alert">
                  ¡Tu solicitud de pedido especial ha sido enviada con éxito! Nos
                  pondremos en contacto contigo pronto. 🧁
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="nombreCliente"
                      className="form-label fw-bold"
                    >
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreCliente"
                      placeholder="Ej. Pepito"
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="contactoCliente"
                      className="form-label fw-bold"
                    >
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactoCliente"
                      placeholder="Ej. +569..."
                      value={contactoCliente}
                      onChange={(e) => setContactoCliente(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="tipoProducto" className="form-label fw-bold">
                    Tipo de Repostería
                  </label>
                  <select
                    className="form-select"
                    id="tipoProducto"
                    value={tipoProducto}
                    onChange={(e) => setTipoProducto(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción...
                    </option>
                    <option value="Galletas">
                      Galletas Temáticas Decoradas
                    </option>
                    <option value="Cake Popsicles">
                      Box de Cake Popsicles
                    </option>
                    <option value="Cupcakes">Cupcakes Personalizados</option>
                    <option value="Mixto">Box Surtido / Mixto</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="tematica" className="form-label fw-bold">
                    Temática o Motivo del Evento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tematica"
                    placeholder="Ej. Cumpleaños, Graduación, Halloween, Personaje (Bob Esponja, etc.)"
                    value={tematica}
                    onChange={(e) => setTematica(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="detallesIdea" className="form-label fw-bold">
                    Cuéntanos los detalles de tu idea
                  </label>
                  <textarea
                    className="form-control"
                    id="detallesIdea"
                    rows={4}
                    placeholder="Describe colores, cantidad aproximada de personas, sabores preferidos o dedicatorias..."
                    value={detallesIdea}
                    onChange={(e) => setDetallesIdea(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="referenciaImg" className="form-label fw-bold">
                    Imagen de Referencia (Opcional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="referenciaImg"
                  />
                  <div className="form-text">
                    Puedes subir una foto o diseño que te sirva de inspiración.
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      backgroundColor: "#e83e8c",
                      borderColor: "#e83e8c",
                    }}
                  >
                    Enviar Solicitud de Cotización
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <div className="container-fluid mb-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.8652023171296!2d-70.6151711566251!3d-33.4328796238235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c586497835ad%3A0xa929ba68e1ac6051!2sDuoc%20UC%20Casa%20Central!5e1!3m2!1ses!2scl!4v1722850059541!5m2!1ses!2scl"
            width="100%"
            height="250px"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mb-0">&copy; 2026 Lart_duniss - Repostería Artesanal</p>
      </footer>
    </div>
  );
}