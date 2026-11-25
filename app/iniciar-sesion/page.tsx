"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function IniciarSesionPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser === "admin" && cleanPass === "12345") {
      setErrorVisible(false);
      router.push("/admin");
    } else if (
      (cleanUser === "usuario" ||
        cleanUser === "cliente" ||
        cleanUser.includes("@")) &&
      cleanPass.length > 0
    ) {
      setErrorVisible(false);
      router.push("/cliente");
    } else {
      setErrorVisible(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffa6ef",
        minHeight: "100vh",
        paddingBottom: "3rem",
      }}
    >
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/categorias">
                  Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/nosotros">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex">
            <Link
              href="/iniciar-sesion"
              className="btn btn-outline-primary ms-2 active"
            >
              Iniciar Sesión
            </Link>
            <Link href="/crear-sesion" className="btn btn-primary ms-2">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card"
              style={{
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  {/* Imagen lateral de Repostería */}
                  <div className="col-md-6 d-none d-md-block">
                    <img
                      src="/assets/img/Pasteleria_1.jpg"
                      alt="Pastelería Lart_duniss"
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "420px",
                        objectFit: "cover",
                        borderRadius: "8px 0 0 8px",
                      }}
                    />
                  </div>

                  {/* Formulario de Login */}
                  <div className="col-md-6 p-4 p-md-5">
                    <h2 className="mb-2 text-center fw-bold">¡Hola de nuevo!</h2>
                    <p className="text-center text-muted mb-4">
                      Ingresa a tu cuenta de Lart_duniss
                    </p>

                    {errorVisible && (
                      <div
                        id="error"
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>¡Error!</strong> Usuario o contraseña incorrectos.
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setErrorVisible(false)}
                        />
                      </div>
                    )}

                    <form id="loginForm" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Correo o Usuario
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="ej: cliente o admin"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4 d-flex justify-content-between align-items-center">
                        <Link
                          href="/crear-sesion"
                          className="small text-decoration-none"
                        >
                          ¿No tienes cuenta? Regístrate
                        </Link>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                      >
                        <strong>INICIAR SESIÓN</strong>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-center bg-light border-info">
              <div className="card-body">
                <h6 className="card-title text-uppercase fw-bold text-muted">
                  Acceso directo rápido (Pruebas)
                </h6>
                <Link
                  href="/cliente"
                  className="btn btn-sm btn-outline-danger me-2"
                >
                  Entrar como Cliente
                </Link>
                <Link href="/admin" className="btn btn-sm btn-outline-dark">
                  Entrar como Administrador
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}