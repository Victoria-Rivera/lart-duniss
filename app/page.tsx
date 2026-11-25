"use client";

import { useState } from "react";
import Link from "next/link";
import type { ItemCarrito, ProductoTienda } from "./carrito/page";

interface SlideCarousel {
  id: number;
  imagen: string;
  alt: string;
  titulo: string;
  subtitulo: string;
}

interface EspecialidadItem {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  href: string;
}

const slidesCarousel: SlideCarousel[] = [
  {
    id: 0,
    imagen: "/assets/img/Pasteleria_1.jpg",
    alt: "Nuevas Delicias",
    titulo: "Nuevas Creaciones",
    subtitulo: "Descubre nuestras galletas artesanales horneadas hoy.",
  },
  {
    id: 1,
    imagen: "/assets/img/Pasteleria_2.jpg",
    alt: "Ofertas Dulces",
    titulo: "Promociones Especiales",
    subtitulo: "Aprovecha los descuentos en cajas surtidas de cupcakes.",
  },
  {
    id: 2,
    imagen: "/assets/img/Pasteleria_4.jpg",
    alt: "Más Vendidos",
    titulo: "Los Favoritos",
    subtitulo: "Explora los postres más pedidos por nuestros clientes.",
  },
];

const especialidades: EspecialidadItem[] = [
  {
    id: 1,
    nombre: "Galletas",
    descripcion: "Crujientes, con chispas de chocolate y decoradas a mano.",
    imagen: "/assets/img/Pasteleria_1.jpg",
    href: "/categorias",
  },
  {
    id: 2,
    nombre: "Cake Popsicles",
    descripcion: "Paletas de pastel cubiertas con el mejor chocolate belga.",
    imagen: "/assets/img/Pasteleria_2.jpg",
    href: "/categorias",
  },
  {
    id: 3,
    nombre: "Cupcakes",
    descripcion: "Esponjosos pastelitos con frosting de queso crema y vainilla.",
    imagen: "/assets/img/Pasteleria_3.jpg",
    href: "/categorias",
  },
];

const catalogoDestacado: ProductoTienda[] = [
  {
    id: 1,
    nombre: "Galletas Chispas Artesanales",
    categoria: "Galletas",
    descripcion: "Crujientes, con chispas de chocolate y decoradas a mano.",
    imagen: "/assets/img/Pasteleria_1.jpg",
    precio_descuento: 5500,
    precio_nuevo: 4200,
    stock: 10,
  },
  {
    id: 2,
    nombre: "Cake Popsicles Belgas",
    categoria: "Cake Popsicles",
    descripcion: "Paletas de pastel cubiertas con chocolate.",
    imagen: "/assets/img/Pasteleria_2.jpg",
    precio_descuento: 6000,
    precio_nuevo: 4800,
    stock: 8,
  },
  {
    id: 3,
    nombre: "Cupcakes Vainilla & Queso Crema",
    categoria: "Cupcakes",
    descripcion: "Esponjosos pastelitos con frosting artesanal.",
    imagen: "/assets/img/Pasteleria_3.jpg",
    precio_descuento: 7000,
    precio_nuevo: 5500,
    stock: 12,
  },
  {
    id: 4,
    nombre: "Box Surtido Repostería",
    categoria: "Galletas",
    descripcion: "Selección especial para compartir.",
    imagen: "/assets/img/Pasteleria_4.jpg",
    precio_descuento: 12900,
    precio_nuevo: 9990,
    stock: 6,
  },
];

export default function HomePage() {
  const [slideActivo, setSlideActivo] = useState(0);

  const anteriorSlide = () => {
    setSlideActivo((prev) =>
      prev === 0 ? slidesCarousel.length - 1 : prev - 1
    );
  };

  const siguienteSlide = () => {
    setSlideActivo((prev) =>
      prev === slidesCarousel.length - 1 ? 0 : prev + 1
    );
  };

  const addToCart = (product: ProductoTienda) => {
    const cart: ItemCarrito[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity += 1;
      } else {
        alert(`No hay suficiente stock disponible de ${product.nombre}.`);
        return;
      }
    } else {
      if (product.stock > 0) {
        cart.push({ ...product, quantity: 1 });
      } else {
        alert(`Lo sentimos, ${product.nombre} está agotado.`);
        return;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`¡Se añadió "${product.nombre}" al carrito! 🛒`);
  };

  const slideActual = slidesCarousel[slideActivo];

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      {/* Navbar Superior */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#ffa6ef",
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
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
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
        style={{ backgroundColor: "#ffa6ef" }}
      >
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarBottomContent"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link active text-danger fw-bold" href="/">
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
                <Link className="nav-link" href="/pedidos-especiales">
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

      {/* Carrusel */}
      <div className="container my-4">
        <div
          id="carouselWeb"
          className="carousel slide shadow-sm rounded overflow-hidden position-relative"
        >
          <div className="carousel-inner">
            <div className="carousel-item active d-block">
              <img
                src={slideActual.imagen}
                className="d-block w-100"
                alt={slideActual.alt}
                style={{ height: "380px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{slideActual.titulo}</h5>
                <p>{slideActual.subtitulo}</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            onClick={anteriorSlide}
            aria-label="Anterior"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            onClick={siguienteSlide}
            aria-label="Siguiente"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>

          <div className="carousel-indicators">
            {slidesCarousel.map((slide) => (
              <button
                key={slide.id}
                type="button"
                className={slide.id === slideActivo ? "active" : ""}
                aria-current={slide.id === slideActivo ? "true" : undefined}
                aria-label={`Slide ${slide.id + 1}`}
                onClick={() => setSlideActivo(slide.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Especialidades */}
      <section id="categorias" className="py-4">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#b02a65" }}>
            Nuestras Especialidades
          </h2>
          <div className="row g-4">
            {especialidades.map((esp) => (
              <div className="col-md-4" key={esp.id}>
                <div className="card h-100">
                  <img
                    src={esp.imagen}
                    className="card-img-top"
                    alt={esp.nombre}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5
                        className="card-title fw-bold"
                        style={{ color: "#b02a65" }}
                      >
                        {esp.nombre}
                      </h5>
                      <p className="card-text text-secondary">
                        {esp.descripcion}
                      </p>
                    </div>
                    <Link
                      href={esp.href}
                      className="btn btn-primary mt-3"
                      style={{
                        backgroundColor: "#e83e8c",
                        borderColor: "#e83e8c",
                      }}
                    >
                      Explorar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo Destacado */}
      <section id="productos" className="py-5 bg-white bg-opacity-50">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#b02a65" }}>
            Catálogo Destacado
          </h2>
          <div className="row row-cols-1 row-cols-md-4 g-4" id="product-list">
            {catalogoDestacado.slice(0, 4).map((item) => (
              <div className="col" key={item.id}>
                <div
                  className="card h-100 p-2"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f8d7da",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.04)",
                    borderRadius: "15px",
                  }}
                >
                  <img
                    src={item.imagen}
                    className="card-img-top rounded"
                    alt={item.nombre}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5
                        className="card-title fs-6 fw-bold"
                        style={{ color: "#b02a65" }}
                      >
                        {item.nombre}
                      </h5>
                      <p className="text-muted small mb-2">{item.descripcion}</p>
                    </div>
                    <div>
                      <div className="d-flex flex-column mb-3">
                        <span
                          className="text-decoration-line-through"
                          style={{ color: "#adb5bd", fontSize: "0.9rem" }}
                        >
                          ${item.precio_descuento.toLocaleString("es-CL")}
                        </span>
                        <span
                          className="fw-bolder"
                          style={{ color: "#d63384", fontSize: "1.2rem" }}
                        >
                          ${item.precio_nuevo.toLocaleString("es-CL")}
                        </span>
                      </div>
                      <div className="d-grid gap-2">
                        <Link
                          href="/productos/producto1"
                          className="btn btn-sm btn-outline-danger"
                        >
                          Ver Detalle
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={() => addToCart(item)}
                        >
                          <i className="bi bi-cart-plus"></i> Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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