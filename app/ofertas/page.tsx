import Link from "next/link";

interface ProductoOferta {
  id: number;
  nombre: string;
  imagen: string;
  precio_descuento: number;
  precio_nuevo: number;
  link: string;
}

const ofertasSemana: ProductoOferta[] = [
  {
    id: 1,
    nombre: "Box Galletas Decoradas (6 und.)",
    imagen: "/assets/img/Pasteleria_1.jpg",
    precio_descuento: 8500,
    precio_nuevo: 6500,
    link: "/productos/producto1",
  },
  {
    id: 2,
    nombre: "Cake Popsicles Chocolate Belga",
    imagen: "/assets/img/Pasteleria_2.jpg",
    precio_descuento: 7200,
    precio_nuevo: 5400,
    link: "/productos/producto1",
  },
  {
    id: 3,
    nombre: "Cupcakes Frosting Vainilla",
    imagen: "/assets/img/Pasteleria_3.jpg",
    precio_descuento: 9000,
    precio_nuevo: 6990,
    link: "/productos/producto1",
  },
  {
    id: 4,
    nombre: "Selección Dulce Fin de Semana",
    imagen: "/assets/img/Pasteleria_4.jpg",
    precio_descuento: 14500,
    precio_nuevo: 11200,
    link: "/productos/producto1",
  },
];

export default function Ofertas() {
  return (
    <div style={{ backgroundColor: "#ffa6ef", minHeight: "100vh", paddingBottom: "3rem" }}>
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar dulce..."
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
                <Link className="nav-link active text-success" href="/ofertas">
                  <strong>Ofertas</strong>
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

      {/* Productos en Oferta */}
      <section id="productos" className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center fw-bold">
            Las mejores OFERTAS de la semana
          </h2>
          <p className="text-center text-muted mb-5">
            Disfruta de nuestros descuentos especiales en repostería fina.
          </p>

          <div className="row" id="productContainer">
            {ofertasSemana.map((producto) => (
              <div className="col-md-3 mb-4" key={producto.id}>
                <Link
                  href={producto.link}
                  className="text-decoration-none d-block h-100"
                >
                  <div
                    className="card h-100 overflow-hidden"
                    style={{
                      background: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <img
                      src={producto.imagen}
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <p
                          className="card-title text-dark mb-2 fw-bold"
                          style={{ fontSize: "1rem" }}
                        >
                          {producto.nombre}
                        </p>
                      </div>
                      <div className="d-flex flex-column mt-2">
                        <span
                          className="text-decoration-line-through"
                          style={{ color: "#6c757d", fontSize: "0.9rem" }}
                        >
                          ${producto.precio_descuento.toLocaleString("es-CL")}
                        </span>
                        <span
                          className="fw-bolder"
                          style={{ color: "#b02a65", fontSize: "1.2rem" }}
                        >
                          ${producto.precio_nuevo.toLocaleString("es-CL")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}