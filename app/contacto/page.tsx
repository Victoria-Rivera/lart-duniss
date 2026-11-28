"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [enviando, setEnviando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensajeOk("");
    setEnviando(true);

    try {
      await apiFetch("/api/v1/opiniones", {
        method: "POST",
        body: JSON.stringify({
          autor: nombre,
          comentario,
          calificacion,
        }),
      });
      setMensajeOk("¡Gracias por escribirnos! Tu mensaje fue enviado.");
      setNombre("");
      setComentario("");
      setCalificacion(5);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el mensaje. Asegúrate de haber iniciado sesión."
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
      <div className="container" style={{ maxWidth: "600px" }}>
        <div
          className="card p-4 shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <h2 className="fw-bold mb-3" style={{ color: "#b02a65" }}>
            Contacto y Opiniones
          </h2>
          <p className="text-secondary small mb-4">
            Cuéntanos cómo fue tu experiencia con Lart_duniss o déjanos un
            mensaje.
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
                Ir a Iniciar Sesión
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Tu Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Calificación</label>
              <select
                className="form-select"
                value={calificacion}
                onChange={(e) => setCalificacion(Number(e.target.value))}
              >
                <option value={5}>5 - Excelente</option>
                <option value={4}>4 - Muy bueno</option>
                <option value={3}>3 - Bueno</option>
                <option value={2}>2 - Regular</option>
                <option value={1}>1 - Malo</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Mensaje / Opinión</label>
              <textarea
                rows={4}
                className="form-control"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="btn btn-danger w-100 fw-bold"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}