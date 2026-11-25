"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      alert("Por favor completa tu nombre, correo y mensaje.");
      return;
    }

    setEnviado(true);
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div style={{ backgroundColor: "#ffa6ef", minHeight: "100vh" }}>
      {/* Navbar Superior */}
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

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarTopContent"
          >
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

      {/* Navbar Inferior */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-none d-lg-block border-top border-bottom">
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
                <Link className="nav-link active text-success" href="/contacto">
                  <strong>Contacto</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/pedidos-especiales">
                  Pedidos especiales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success ms-4" href="/carrito">
                  <strong>
                    <i className="bi bi-cart4"></i> Carrito{" "}
                    <span>
                      <strong>$5.000</strong>
                    </span>
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Formulario de Contacto */}
      <div className="row justify-content-center my-5 mx-2">
        <div className="col-md-8">
          <div
            className="card p-4"
            style={{
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              borderRadius: "12px",
            }}
          >
            <div className="card-body">
              <h2 className="text-center mb-3 fw-bold">💌 Contáctanos</h2>
              <p className="text-center text-muted mb-4">
                ¿Tienes dudas sobre un pedido personalizado? Escríbenos.
              </p>

              {enviado && (
                <div className="alert alert-success text-center" role="alert">
                  ¡Mensaje enviado! Te responderemos pronto.
                </div>
              )}

              <div className="row justify-content-center">
                <div className="col-md-10">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mensaje" className="form-label">
                        Mensaje
                      </label>
                      <textarea
                        className="form-control"
                        id="mensaje"
                        rows={4}
                        placeholder="Cuéntanos los detalles de tus dulces o diseño deseado..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                      />
                    </div>
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary px-4">
                        Enviar Mensaje
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con Mapa */}
      <footer className="bg-dark text-light text-center py-4">
        <div className="container-fluid mb-3">
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