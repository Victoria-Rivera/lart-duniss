import Link from "next/link";

interface IntegranteEquipo {
  id: number;
  cargo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
}

const equipoBlog: IntegranteEquipo[] = [
  {
    id: 1,
    cargo: "Fundadora & Chef Pastelera",
    subtitulo: "Lart_duniss",
    descripcion:
      "Especialista en decoración con glaseado real y diseño de personajes temáticos.",
    imagen: "/assets/img/pepe.png",
    alt: "Repostera",
  },
  {
    id: 2,
    cargo: "Especialista en Choco-Arte",
    subtitulo: "Creativa de Cake Pops",
    descripcion:
      "Encargada de las paletas de pastel decoradas y combinación de sabores finos.",
    imagen: "/assets/img/kinito.png",
    alt: "Diseño",
  },
  {
    id: 3,
    cargo: "Gestión & Pedidos",
    subtitulo: "Atención al Cliente",
    descripcion:
      "Coordinación de cotizaciones especiales y logística de envíos para eventos.",
    imagen: "/assets/img/orko.png",
    alt: "Atención",
  },
];

export default function BlogItems() {
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
              width={45}
              height={45}
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
                placeholder="Buscar historias..."
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
                <Link className="nav-link active text-danger fw-bold" href="/blog">
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

      {/* Contenido del Artículo del Blog */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-decoration-none text-danger">
                    Inicio
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/blog" className="text-decoration-none text-danger">
                    Blog
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Historia de Lart_duniss
                </li>
              </ol>
            </nav>

            <div
              className="card p-2 p-md-4"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f8d7da",
                boxShadow: "0 4px 12px rgba(214, 51, 132, 0.08)",
                borderRadius: "15px",
              }}
            >
              <img
                src="/assets/img/Pasteleria_6.jpg"
                className="card-img-top"
                alt="Repostería Artesanal Lart_duniss"
                style={{
                  maxHeight: "380px",
                  objectFit: "cover",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
              <div className="card-body p-md-4">
                <h2
                  className="card-title text-center mb-4 fw-bold"
                  style={{ color: "#b02a65" }}
                >
                  🧁 Historia de Lart_duniss: El Arte de Crear Momentos Dulces
                </h2>

                <h4 className="mb-2 fw-bold" style={{ color: "#b02a65" }}>
                  El Origen de un Sueño 🍓
                </h4>
                <p
                  className="card-text"
                  style={{ color: "#495057", lineHeight: 1.7 }}
                >
                  <strong>Lart_duniss</strong> nació de la pasión por transformar
                  la repostería tradicional en piezas de arte comestibles. Lo que
                  comenzó como un pequeño proyecto casero horneando detalles
                  personalizados para amigos y familiares, rápidamente se
                  convirtió en un taller de repostería artesanal reconocido por
                  su dedicación, creatividad y sabores únicos.
                </p>

                <h4 className="mb-2 fw-bold" style={{ color: "#b02a65" }}>
                  Innovación y Diseños Temáticos 🎨
                </h4>
                <p
                  className="card-text"
                  style={{ color: "#495057", lineHeight: 1.7 }}
                >
                  Nuestra especialidad abarca desde galletas glaseadas a mano
                  inspiradas en personajes icónicos y fechas especiales, hasta
                  elegantes <em>cake popsicles</em> bañados en fino chocolate
                  belga y cajas de cupcakes decoradas para momentos
                  inolvidables como aniversarios, graduaciones y fiestas
                  temáticas. Cada producto es elaborado de forma artesanal
                  cuidando el más mínimo detalle visual y gustativo.
                </p>

                <h4 className="mb-2 fw-bold" style={{ color: "#b02a65" }}>
                  Nuestra Misión
                </h4>
                <p
                  className="card-text"
                  style={{ color: "#495057", lineHeight: 1.7 }}
                >
                  Endulzar las celebraciones de nuestros clientes mediante
                  creaciones artesanales de máxima calidad, combinando
                  ingredientes seleccionados con un diseño visualmente
                  deslumbrante que convierta cada bocado en un recuerdo especial.
                </p>

                <h4 className="mb-2 fw-bold" style={{ color: "#b02a65" }}>
                  Nuestra Visión
                </h4>
                <p
                  className="card-text"
                  style={{ color: "#495057", lineHeight: 1.7 }}
                >
                  Posicionarnos como la repostería artesanal y personalizada de
                  referencia, destacando por nuestra constante innovación en
                  técnicas de decoración, atención cercana y entregas de alta
                  repostería a pedido.
                </p>

                <hr className="my-5" style={{ color: "#f8d7da" }} />

                {/* Sección de Integrantes del Equipo / Reposteras */}
                <h3
                  className="text-center mb-4 fw-bold"
                  style={{ color: "#b02a65" }}
                >
                  El Equipo Detrás de la Magia
                </h3>
                <div className="text-center">
                  <div className="row g-4">
                    {equipoBlog.map((integrante) => (
                      <div className="col-md-4" key={integrante.id}>
                        <img
                          src={integrante.imagen}
                          className="rounded-circle object-fit-cover shadow-sm mb-3"
                          width={130}
                          height={130}
                          alt={integrante.alt}
                        />
                        <h4
                          className="fs-5 mb-1 fw-bold"
                          style={{ color: "#b02a65" }}
                        >
                          {integrante.cargo}
                        </h4>
                        <small className="text-muted d-block mb-2">
                          <strong>{integrante.subtitulo}</strong>
                        </small>
                        <p className="small text-secondary">
                          {integrante.descripcion}
                        </p>
                        <div className="d-flex justify-content-center">
                          <Link
                            href="/contacto"
                            className="btn btn-outline-danger btn-sm"
                          >
                            <i className="bi bi-instagram"></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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