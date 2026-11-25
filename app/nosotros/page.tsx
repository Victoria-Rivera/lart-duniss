import Link from "next/link";

export default function Nosotros() {
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
                placeholder="Buscar dulce o galleta..."
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
                <Link className="nav-link active" href="/nosotros">
                  <strong>Nosotros</strong>
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
                <Link className="btn btn-success ms-4" href="/carrito">
                  <strong>
                    <i className="bi bi-cart4"></i> Carrito{" "}
                    <span>
                      <strong>$0</strong>
                    </span>
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div
              className="card"
              style={{
                backgroundColor: "#f1edf1",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                borderRadius: "15px",
              }}
            >
              <img
                src="/assets/img/Banner.jpg"
                className="card-img-top"
                alt="Repostería Lart_duniss"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  maxHeight: "350px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body p-4 p-md-5">
                <h2 className="card-title text-center mb-4 fw-bold" style={{ color: "#343a40" }}>
                  Historia de Lart_duniss
                </h2>

                <h4 className="mb-2 text-primary">Un Sueño Hecho Dulce ✨</h4>
                <p className="card-text" style={{ color: "#495057", lineHeight: 1.7 }}>
                  Lart_duniss nació como una iniciativa enfocada en transformar la repostería
                  tradicional en piezas de arte comestibles y personalizadas. Desde nuestros
                  primeros pedidos de galletas decoradas a mano y cupcakes temáticos, nos hemos
                  dedicado a crear momentos inolvidables para cada uno de nuestros clientes.
                </p>

                <h4 className="mb-2 text-primary">Pasión por el Detalle y el Sabor</h4>
                <p className="card-text" style={{ color: "#495057", lineHeight: 1.7 }}>
                  Cada galleta, cake popsicle y cupcake es preparado de forma artesanal utilizando
                  ingredientes de la más alta calidad. Nos especializamos en adaptar nuestros
                  diseños a las ideas, personajes y temáticas elegidas por nuestros clientes,
                  garantizando productos únicos y deliciosos.
                </p>

                <h4 className="mb-2 text-primary">Misión</h4>
                <p className="card-text" style={{ color: "#495057", lineHeight: 1.7 }}>
                  Nuestra misión es endulzar las celebraciones de nuestros clientes a través de
                  productos de repostería creativa de alta calidad, destacando por un diseño
                  personalizado minucioso, un sabor excepcional y una atención cálida e
                  individualizada.
                </p>

                <h4 className="mb-2 text-primary">Visión</h4>
                <p className="card-text" style={{ color: "#495057", lineHeight: 1.7 }}>
                  Aspiramos a consolidarnos como una tienda de repostería artesanal y personalizada
                  de referencia local, reconocida por la innovación en nuestros diseños decorativos
                  y la constante satisfacción de nuestra comunidad.
                </p>

                <hr className="my-5" />

                {/* Sección del Equipo */}
                <h3 className="text-center mb-4 fw-bold">Nuestro Equipo Creador</h3>
                <div className="row text-center justify-content-center g-4">
                  <div className="col-md-4">
                    <img
                      src="/assets/img/pedro.png"
                      className="rounded-circle mb-3"
                      width={130}
                      height={130}
                      alt="Integrante"
                      style={{
                        objectFit: "cover",
                        border: "3px solid #b02a65",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                    <h5 className="fw-bold mb-1">Victoria</h5>
                    <small className="text-primary d-block mb-2">
                      <strong>Desarrolladora Frontend & Diseñadora</strong>
                    </small>
                    <p className="small text-muted">
                      Estudiante de Ingeniería en Informática en Duoc UC.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <a
                        href="https://github.com/Victoria-Rivera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm"
                      >
                        <i className="bi bi-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}