"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "@/lib/servicios-api";

export default function CrearSesionPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      await registrarUsuario({
        username,
        email,
        password,
        rol: "CLIENTE",
      });
      setExito("Cuenta creada con éxito. Redirigiendo a Iniciar Sesión...");
      setTimeout(() => {
        router.push("/iniciar-sesion");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo registrar el usuario. Revisa si el servidor está activo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }}
      className="d-flex align-items-center py-5"
    >
      <div className="container" style={{ maxWidth: "480px" }}>
        <div
          className="card p-4 shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <h2 className="text-center fw-bold mb-3" style={{ color: "#b02a65" }}>
            Crear Cuenta en Lart_duniss
          </h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {exito && <div className="alert alert-success py-2">{exito}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="btn btn-danger w-100 fw-bold"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              {cargando ? "Registrando..." : "Registrarme"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link
              href="/iniciar-sesion"
              className="text-decoration-none"
              style={{ color: "#b02a65" }}
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}