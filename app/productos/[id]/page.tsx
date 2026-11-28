import Link from "next/link";
import BotonAgregarCarrito from "../botonAgregarCarrito/page";


interface ProductoApi {
  id: number | string;
  name?: string;
  nombre?: string;
  category?: string;
  categoria?: string;
  price?: number;
  precio_nuevo?: number;
  precio_descuento?: number;
  stocked?: boolean;
  stock?: number;
  image?: string;
  imagen?: string;
  descripcion?: string;
}

export default async function ProductoDinamicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  let producto: ProductoApi | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/productos/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      producto = await res.json();
    }
  } catch {
    producto = null;
  }

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2 className="fw-bold text-danger">Producto no encontrado</h2>
        <p className="text-muted">No se pudo cargar el producto #{id}.</p>
        <Link href="/categorias" className="btn btn-primary">
          Volver a Categorías
        </Link>
      </div>
    );
  }

  const nombre = producto.nombre ?? producto.name ?? "Producto";
  const categoria = producto.categoria ?? producto.category ?? "Repostería";
  const precio = producto.precio_nuevo ?? producto.price ?? 0;
  const precioAnterior = producto.precio_descuento ?? precio;
  const disponible =
    typeof producto.stock === "number"
      ? producto.stock > 0
      : Boolean(producto.stocked);
  const imagen =
    producto.imagen ??
    (producto.image ? `/assets/img/${producto.image}` : "/assets/img/Pasteleria_1.jpg");

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh", padding: "3rem 0" }}>
      <div className="container">
        <div className="card p-4 shadow-sm">
          <div className="row align-items-center g-4">
            <div className="col-md-6 text-center">
              <img
                src={imagen}
                alt={nombre}
                className="img-fluid rounded"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <span className="badge bg-light text-dark mb-2">{categoria}</span>
              <h1 className="fw-bold" style={{ color: "#b02a65" }}>
                {nombre}
              </h1>
              {precioAnterior > precio && (
                <div className="text-muted text-decoration-line-through">
                  ${precioAnterior.toLocaleString("es-CL")}
                </div>
              )}
              <div className="fs-3 fw-bold mb-2" style={{ color: "#d63384" }}>
                ${precio.toLocaleString("es-CL")}
              </div>
              <p className="mb-3">
                <strong>¿Hay en stock?:</strong> {disponible ? "Sí" : "No"}
              </p>
              <p className="text-secondary mb-4">
                {producto.descripcion ?? "Preparación artesanal de Lart_duniss."}
              </p>

              <BotonAgregarCarrito
                producto={{
                  id: Number(producto.id) || 1,
                  nombre,
                  categoria,
                  descripcion: producto.descripcion ?? "",
                  imagen,
                  precio_descuento: precioAnterior,
                  precio_nuevo: precio,
                  stock: producto.stock ?? (disponible ? 10 : 0),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}