import Link from "next/link";

interface ArticuloBlog {
  id: number;
  titulo: string;
  resumen: string;
  imagen: string;
  alt: string;
  href: string;
}

const articulos: ArticuloBlog[] = [
  {
    id: 1,
    titulo: "Secretos para unas Galletas Perfectas",
    resumen:
      "Aprende cómo lograr una textura crujiente por fuera y suave por dentro con nuestros tips de horneado.",
    imagen: "/assets/img/Pasteleria_1.jpg",
    alt: "Galletas Artesanales",
    href: "/blog-items",
  },
  {
    id: 2,
    titulo: "El Arte de los Cake Popsicles",
    resumen:
      "Todo sobre la combinación perfecta de bizcocho y chocolate belga en un formato divertido.",
    imagen: "/assets/img/Pasteleria_2.jpg",
    alt: "Cake Popsicles",
    href: "/blog-items",
  },
  {
    id: 3,
    titulo: "Tips de Decoración con Frosting",
    resumen:
      "Técnicas sencillas para lograr copetes profesionales y coloridos en tus cupcakes caseros.",
    imagen: "/assets/img/Pasteleria_3.jpg",
    alt: "Decoración de Cupcakes",
    href: "/blog-items",
  },
];

export default function Blog() {
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
                placeholder="Buscar en el blog..."
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
                <Link className="nav-link active fw-bold text-danger" href="/blog">
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
                  Pedidos especiales
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

      {/* Sección de Blogs / Artículos de Repostería */}
      <section id="categorias" className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center fw-bold" style={{ color: "#b02a65" }}>
            Blog y Consejos Dulces
          </h2>
          <p className="text-center text-muted mb-5">
            Descubre tips de repostería, recetas exclusivas y novedades de
            Lart_duniss.
          </p>

          <div className="row g-4">
            {articulos.map((articulo) => (
              <div className="col-md-4" key={articulo.id}>
                <div
                  className="card h-100"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f8d7da",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.04)",
                    borderRadius: "15px",
                  }}
                >
                  <img
                    src={articulo.imagen}
                    className="card-img-top"
                    alt={articulo.alt}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5
                        className="card-title fw-bold"
                        style={{ color: "#b02a65" }}
                      >
                        {articulo.titulo}
                      </h5>
                      <p className="card-text text-secondary">{articulo.resumen}</p>
                    </div>
                    <Link
                      href={articulo.href}
                      className="btn btn-primary mt-3"
                      style={{
                        backgroundColor: "#e83e8c",
                        borderColor: "#e83e8c",
                      }}
                    >
                      Leer más
                    </Link>
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