"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/lib/servicios-api";

export default function IniciarSesionPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await loginUsuario({ username, email: username, password });
      router.push("/categorias");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Credenciales incorrectas o servidor no disponible."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff5f8", minHeight: "100vh" }} className="d-flex align-items-center py-5">
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <h2 className="text-center fw-bold mb-3" style={{ color: "#b02a65" }}>
            Iniciar Sesión
          </h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Usuario o Correo</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <button
              type="submit"
              disabled={cargando}
              className="btn btn-danger w-100 fw-bold"
              style={{ backgroundColor: "#e83e8c", borderColor: "#e83e8c" }}
            >
              {cargando ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link href="/crear-sesion" className="text-decoration-none" style={{ color: "#b02a65" }}>
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}