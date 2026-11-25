"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface ProductoTienda {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  precio_descuento: number;
  precio_nuevo: number;
  stock: number;
  link?: string;
}

export interface ItemCarrito extends ProductoTienda {
  quantity: number;
}

const catalogoBase: ProductoTienda[] = [
  {
    id: 1,
    nombre: "Galletas Chispas Artesanales",
    categoria: "Galletas",
    descripcion: "Crujientes con chispas de chocolate y decoradas a mano.",
    imagen: "/assets/img/Pasteleria_1.jpg",
    precio_descuento: 5500,
    precio_nuevo: 4200,
    stock: 10,
  },
  {
    id: 2,
    nombre: "Cake Popsicles Belgas",
    categoria: "Cake Popsicles",
    descripcion: "Bizcocho suave cubierto en chocolate.",
    imagen: "/assets/img/Pasteleria_2.jpg",
    precio_descuento: 6000,
    precio_nuevo: 4800,
    stock: 8,
  },
  {
    id: 3,
    nombre: "Cupcakes Vainilla & Queso Crema",
    categoria: "Cupcakes",
    descripcion: "Esponjosos con frosting artesanal.",
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

export default function CarritoPage() {
  const [cart, setCart] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const guardarCarrito = (nuevoCart: ItemCarrito[]) => {
    setCart(nuevoCart);
    localStorage.setItem("cart", JSON.stringify(nuevoCart));
  };

  const addToCart = (id: number) => {
    const product = catalogoBase.find((p) => p.id === id);
    if (!product) return;

    const existing = cart.find((item) => item.id === id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert(`No puedes añadir más de ${product.stock} unidades de ${product.nombre}.`);
        return;
      }
      const updated = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      guardarCarrito(updated);
    } else {
      if (product.stock <= 0) {
        alert(`Lo sentimos, ${product.nombre} está agotado.`);
        return;
      }
      guardarCarrito([...cart, { ...product, quantity: 1 }]);
    }
  };

  const changeQuantity = (id: number, delta: number) => {
    const product = cart.find((item) => item.id === id);
    if (!product) return;

    const original = catalogoBase.find((p) => p.id === id);
    const maxStock = original ? original.stock : product.stock || 99;

    if (delta > 0 && product.quantity >= maxStock) {
      alert(`No puedes añadir más de ${maxStock} unidades de ${product.nombre}.`);
      return;
    }

    const nextQty = product.quantity + delta;
    const updated =
      nextQty <= 0
        ? cart.filter((item) => item.id !== id)
        : cart.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item));

    guardarCarrito(updated);
  };

  const deleteFromCart = (id: number) => {
    guardarCarrito(cart.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    guardarCarrito([]);
    alert("¡El carrito ha sido vaciado!");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio_nuevo * item.quantity,
    0
  );

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}>
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
              className="d-inline-block align-text-top rounded-circle me-2 object-fit-cover"
              width={40}
              height={40}
            />
            <strong style={{ color: "#b02a65" }}>Lart_duniss</strong>
          </Link>

          <div className="collapse navbar-collapse justify-content-center" id="navbarTopContent">
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
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

      <nav
        className="navbar navbar-expand-lg d-none d-lg-block border-top"
        style={{ backgroundColor: "#ffffff" }}
      >
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
                <Link className="nav-link" href="/pedidos-especiales">
                  Pedidos especiales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success ms-5" href="/carrito">
                  <strong>
                    <i className="bi bi-cart4"></i> Carrito{" "}
                    <span>
                      $<strong>{totalPrice.toLocaleString("es-CL")}</strong>
                    </span>
                  </strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="productos" className="py-5">
        <div className="container">
          <div
            className="alert alert-danger"
            role="alert"
            style={{
              backgroundColor: "#f8d7da",
              borderColor: "#f5c2c7",
              color: "#842029",
            }}
          >
            <strong>¡Vista Carrito de compra!</strong> Gestiona tus productos y simula tu
            pedido fácilmente.
            <br />
            <small>
              La información se gestiona en React y se guarda en <strong>localStorage</strong>.
            </small>
          </div>

          <div className="container mt-5">
            <div className="row g-4">
              <div className="col-md-7">
                <h2 className="text-start mb-4 fw-bold" style={{ color: "#b02a65" }}>
                  Catálogo Rápido
                </h2>
                <div className="row g-3" id="product-list">
                  {catalogoBase.map((producto) => (
                    <div className="col-md-6" key={producto.id}>
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
                          src={producto.imagen}
                          className="card-img-top rounded"
                          alt={producto.nombre}
                          style={{ height: "140px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column justify-content-between p-2">
                          <div>
                            <Link
                              href="/productos/producto1"
                              className="text-decoration-none"
                            >
                              <p
                                className="card-title mb-1 fs-6 fw-bold"
                                style={{ color: "#b02a65" }}
                              >
                                {producto.nombre}
                              </p>
                            </Link>
                            <small className="text-muted">{producto.categoria}</small>
                          </div>
                          <div className="d-flex flex-column my-2">
                            <span
                              className="text-decoration-line-through"
                              style={{ color: "#adb5bd", fontSize: "0.9rem" }}
                            >
                              ${producto.precio_descuento.toLocaleString("es-CL")}
                            </span>
                            <span
                              className="fw-bolder"
                              style={{ color: "#d63384", fontSize: "1.2rem" }}
                            >
                              {producto.precio_nuevo === 0
                                ? "GRATIS"
                                : `$${producto.precio_nuevo.toLocaleString("es-CL")}`}
                            </span>
                          </div>
                          <div className="d-grid gap-1">
                            <small className="text-muted">Stock: {producto.stock}</small>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => addToCart(producto.id)}
                            >
                              <i className="bi bi-cart-plus"></i> Añadir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-5">
                <h2 className="mb-4 fw-bold" style={{ color: "#b02a65" }}>
                  Tu Carrito
                </h2>
                <div className="card p-3 shadow-sm border-0">
                  <div className="table-responsive">
                    <table className="table align-middle" id="cart-table">
                      <thead className="table-light">
                        <tr>
                          <th>Img</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cant</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="cart-list">
                        {cart.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center text-muted py-3">
                              El carrito está vacío.
                            </td>
                          </tr>
                        ) : (
                          <>
                            {cart.map((item) => {
                              const itemTotal = item.precio_nuevo * item.quantity;
                              return (
                                <tr key={item.id}>
                                  <td>
                                    <img
                                      src={item.imagen}
                                      alt={item.nombre}
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                      }}
                                      className="rounded"
                                    />
                                  </td>
                                  <td className="small">{item.nombre}</td>
                                  <td className="small">
                                    ${item.precio_nuevo.toLocaleString("es-CL")}
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        disabled={item.quantity <= 1}
                                        onClick={() => changeQuantity(item.id, -1)}
                                      >
                                        -
                                      </button>
                                      <span className="mx-1 small">{item.quantity}</span>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        disabled={item.quantity >= item.stock}
                                        onClick={() => changeQuantity(item.id, 1)}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="small">
                                    ${itemTotal.toLocaleString("es-CL")}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm py-0 px-1"
                                      onClick={() => deleteFromCart(item.id)}
                                      aria-label={`Eliminar ${item.nombre}`}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="table-light">
                              <td colSpan={4} className="text-end fw-bold">
                                Total:
                              </td>
                              <td colSpan={2} className="fw-bold text-success">
                                ${totalPrice.toLocaleString("es-CL")}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end mt-3">
                    <button
                      id="purchase-button"
                      className="btn btn-outline-secondary btn-sm me-2"
                      type="button"
                      onClick={vaciarCarrito}
                    >
                      Vaciar Carrito
                    </button>
                    <Link className="btn btn-success btn-sm px-4" href="/comprar">
                      Ir a Pagar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <div className="container-fluid mb-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.8652023171296!2d-70.6151711566251!3d-33.4328796238235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c586497835ad%3A0xa929ba68e1ac6051!2sDuoc%20UC%20Casa%20Central!5e1!3m2!1ses!2scl!4v1722850059541!5m2!1ses!2scl"
            width="100%"
            height="200px"
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