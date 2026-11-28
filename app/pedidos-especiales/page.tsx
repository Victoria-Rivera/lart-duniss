"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";

export default function PedidosEspecialesPage() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoEvento, setTipoEvento] = useState("Cumpleaños");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [detallePedido, setDetallePedido] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensajeOk("");
    setEnviando(true);

    const resumenMensaje = `[Pedido Especial - ${tipoEvento}] Cliente: ${nombreCliente} (${correo}) | Fecha: ${fechaEntrega} | Detalle: ${detallePedido}`;

    try {
      await apiFetch("/api/v1/notificaciones", {
        method: "POST",
        body: JSON.stringify({
          destinatario: correo,
          asunto: `Pedido Especial: ${tipoEvento}`,
          mensaje: resumenMensaje,
        }),
      });

      setMensajeOk(
        "¡Solicitud de pedido especial enviada! Te contactaremos pronto."
      );
      setNombreCliente("");
      setCorreo("");
      setTipoEvento("Cumpleaños");
      setFechaEntrega("");
      setDetallePedido("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el pedido especial. Revisa tu sesión o el servidor."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}
      className="py-5"
    >
      <div className="container" style={{ maxWidth: "650px" }}>
        <div
          className="card p-4 shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <h2 className="fw-bold mb-2" style={{ color: "#b02a65" }}>
            Pedidos Especiales y Eventos
          </h2>
          <p className="text-secondary small mb-4">
            Solicita tortas personalizadas, mesas dulces o encargos para fechas
            especiales.
          </p>

          {mensajeOk && (
            <div className="alert alert-success py-2">{mensajeOk}</div>
          )}

          {error && (
            <div className="alert alert-danger py-2">
              <div>{error}</div>
              <Link
                href="/iniciar-sesion"
                className="btn btn-sm btn-outline-danger mt-2"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Tu Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Tipo de Evento</label>
                <select
                  className="form-select"
                  value={tipoEvento}
                  onChange={(e) => setTipoEvento(e.target.value)}
                >
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Matrimonio / Aniversario">
                    Matrimonio / Aniversario
                  </option>
                  <option value="Evento Corporativo">Evento Corporativo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Fecha Estimada de Entrega
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Sabores, Porciones o Detalles
              </label>
              <textarea
                rows={4}
                className="form-control"
                placeholder="Ej: Torta tres leches para 25 personas, decoración pastel..."
                value={detallePedido}
                onChange={(e) => setDetallePedido(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="btn btn-danger w-100 fw-bold"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              {enviando ? "Enviando solicitud..." : "Solicitar Pedido Especial"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}