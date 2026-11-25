"use client";

import { useState } from "react";
import Link from "next/link";
import type { ItemCarrito, ProductoTienda } from "../carrito/page";

const categoriasDisponibles = [
  "Todos",
  "Galletas",
  "Cake Popsicles",
  "Cupcakes",
] as const;

type CategoriaFiltro = (typeof categoriasDisponibles)[number];

const productosCategoria: ProductoTienda[] = [
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
    nombre: "Galletas Glaseadas Temáticas",
    categoria: "Galletas",
    descripcion: "Decoradas a mano para celebraciones especiales.",
    imagen: "/assets/img/Pasteleria_4.jpg",
    precio_descuento: 6800,
    precio_nuevo: 5200,
    stock: 9,
  },
];

export default function CategoriasPage() {
  const [categoriaActiva, setCategoriaActiva] =
    useState<CategoriaFiltro>("Todos");

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productosCategoria
      : productosCategoria.filter((p) => p.categoria === categoriaActiva);

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
            <Link href="/carrito" className="btn btn-success ms-3">
              <i className="bi bi-cart4"></i>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#b02a65" }}>
            Explora Nuestras Categorías
          </h2>
          <p className="text-muted">Filtra por tu tipo de repostería favorita</p>

          <div className="btn-group mt-3" role="group">
            {categoriasDisponibles.map((cat) => {
              const activa = categoriaActiva === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className="btn"
                  style={{
                    borderColor: "#e83e8c",
                    backgroundColor: activa ? "#e83e8c" : "transparent",
                    color: activa ? "#ffffff" : "#e83e8c",
                  }}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat === "Todos" ? "Todas" : cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4" id="category-product-list">
          {productosFiltrados.length === 0 ? (
            <div className="col-12 text-center text-muted py-4">
              No hay productos en esta categoría por el momento.
            </div>
          ) : (
            productosFiltrados.map((item) => (
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
                      <span className="badge bg-light text-dark mb-2">
                        {item.categoria}
                      </span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
