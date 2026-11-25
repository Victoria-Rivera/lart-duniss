"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const regionesRegistro = [
  { id: 13, nombre: "Región Metropolitana de Santiago" },
  { id: 5, nombre: "Región de Valparaíso" },
  { id: 8, nombre: "Región del Biobío" },
];

const comunasRegistro = [
  { id: 13101, id_region: 13, nombre: "Santiago" },
  { id: 13114, id_region: 13, nombre: "Las Condes" },
  { id: 13121, id_region: 13, nombre: "Maipú" },
  { id: 5101, id_region: 5, nombre: "Valparaíso" },
  { id: 5109, id_region: 5, nombre: "Viña del Mar" },
  { id: 8101, id_region: 8, nombre: "Concepción" },
];

function calcularDv(T: string): string {
  let suma = 0;
  let multiplicador = 2;

  for (let i = 1; i <= T.length; i++) {
    suma += parseInt(T.charAt(T.length - i), 10) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  if (dvCalculado === 11) return "0";
  if (dvCalculado === 10) return "k";
  return dvCalculado.toString();
}

function validarRun(rutCompleto: string): boolean {
  if (!rutCompleto) return false;
  const limpio = rutCompleto.trim().replace(/^0+|[\s.]+/g, "");
  if (!/^[0-9]+[-‐]{1}[0-9kK]{1}$/.test(limpio)) return false;

  const partes = limpio.split(/[-‐]/);
  const rut = partes[0];
  let digv = partes[1];
  if (digv === "K") digv = "k";

  return calcularDv(rut) === digv;
}

function validarNombre(nombreIngresado: string): boolean {
  if (!nombreIngresado) return false;
  const limpio = nombreIngresado.trim();
  if (limpio.length <= 2) return false;
  return Number.isNaN(Number(limpio));
}

export default function CrearSesionPage() {
  const [run, setRun] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [calle, setCalle] = useState("");
  const [depto, setDepto] = useState("");
  const [regionId, setRegionId] = useState<number>(regionesRegistro[0].id);
  const [comunaId, setComunaId] = useState<number>(13101);
  const [indicaciones, setIndicaciones] = useState("");

  const [errorRun, setErrorRun] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [toastMsg, setToastMsg] = useState<{
    text: string;
    variant: "success" | "danger";
  } | null>(null);

  const comunasFiltradas = comunasRegistro.filter(
    (c) => c.id_region === regionId
  );

  const handleRegionChange = (nextRegionId: number) => {
    setRegionId(nextRegionId);
    const primeras = comunasRegistro.filter((c) => c.id_region === nextRegionId);
    if (primeras.length > 0) {
      setComunaId(primeras[0].id);
    }
  };

  const limpiarErrores = () => {
    setErrorRun("");
    setErrorNombre("");
    setMensajeExito("");
    setToastMsg(null);
  };

  const handleReset = () => {
    limpiarErrores();
    setRun("");
    setFechaNacimiento("");
    setNombre("");
    setApellidos("");
    setCorreo("");
    setPassword("");
    setCalle("");
    setDepto("");
    setRegionId(regionesRegistro[0].id);
    setComunaId(13101);
    setIndicaciones("");
  };

  const procesarRegistro = (e?: FormEvent) => {
    if (e) e.preventDefault();
    limpiarErrores();

    let hayError = false;

    if (!validarNombre(nombre)) {
      setErrorNombre(
        "El nombre ingresado no es válido (mínimo 3 caracteres y sin números)."
      );
      hayError = true;
    }

    if (!validarRun(run)) {
      setErrorRun("El RUN ingresado no es válido (ej: 12.345.678-9).");
      hayError = true;
    }

    if (!hayError) {
      setMensajeExito("¡Los datos fueron ingresados y validados correctamente!");
      setToastMsg({ text: "¡Registro exitoso!", variant: "success" });
    } else {
      setToastMsg({ text: "Hay errores en el formulario.", variant: "danger" });
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/assets/img/Banner.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="d-inline-block align-text-top me-2 rounded-circle object-fit-cover"
            />
            <strong>Lart_duniss</strong>
          </Link>

          <div className="collapse navbar-collapse justify-content-center" id="navbarTopContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/categorias">
                  Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/crear-sesion">
                  Registro
                </Link>
              </li>
            </ul>
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

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-start shadow-sm">
              <div className="card-body p-4">
                <h4 className="card-title mb-3">Registro de nuevo usuario</h4>
                <p className="card-text text-muted">
                  Bienvenidos a Lart_duniss. Ingrese sus datos personales.
                </p>

                {toastMsg && (
                  <div
                    className={`alert alert-${
                      toastMsg.variant === "success" ? "success" : "danger"
                    } alert-dismissible fade show`}
                    role="alert"
                  >
                    {toastMsg.text}
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Cerrar"
                      onClick={() => setToastMsg(null)}
                    />
                  </div>
                )}

                <form id="form_chileno" onSubmit={procesarRegistro}>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label htmlFor="campo_run" className="form-label">
                        RUN<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="campo_run"
                        placeholder="ej: 12.345.678-9"
                        name="campo_run"
                        value={run}
                        onChange={(e) => setRun(e.target.value)}
                        required
                      />
                      {errorRun && (
                        <span
                          id="mensaje_run"
                          style={{
                            color: "#dc3545",
                            fontSize: "0.875em",
                            marginTop: "0.25rem",
                            display: "block",
                          }}
                        >
                          {errorRun}
                        </span>
                      )}
                    </div>

                    <div className="mb-3 col-6 col-md-6">
                      <label htmlFor="fechaNacimiento" className="form-label">
                        Fecha nacimiento<small className="text-danger">*</small>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <label htmlFor="campo_nombre" className="form-label">
                        Nombre<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="campo_nombre"
                        name="campo_nombre"
                        placeholder="Nombre Apellido"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                      {errorNombre && (
                        <span
                          id="mensaje_nombre"
                          style={{
                            color: "#dc3545",
                            fontSize: "0.875em",
                            marginTop: "0.25rem",
                            display: "block",
                          }}
                        >
                          {errorNombre}
                        </span>
                      )}
                    </div>

                    <div className="col-6 mb-3">
                      <label htmlFor="apellidos" className="form-label">
                        Apellidos<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        name="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3 col-6">
                      <label htmlFor="correo" className="form-label">
                        Correo<small className="text-danger">*</small>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        name="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3 col-6">
                      <label htmlFor="password" className="form-label">
                        Contraseña<small className="text-danger">*</small>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <hr className="w-100 my-4" />
                  <h4 className="card-title mb-2">
                    Dirección de la entrega de los productos
                  </h4>
                  <p className="card-text text-muted">
                    Ingrese dirección de forma detallada
                  </p>

                  <div className="row">
                    <div className="mb-3 col-12 col-md-6">
                      <label htmlFor="calle" className="form-label">
                        Calle<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="calle"
                        name="calle"
                        value={calle}
                        onChange={(e) => setCalle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3 col-12 col-md-6">
                      <label htmlFor="depto" className="form-label">
                        Departamento (opcional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="depto"
                        name="depto"
                        placeholder="Ej: 603"
                        value={depto}
                        onChange={(e) => setDepto(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-6 col-md-6">
                      <label htmlFor="regionSelect" className="form-label">
                        Región<small className="text-danger">*</small>
                      </label>
                      <select
                        className="form-select"
                        id="regionSelect"
                        value={regionId}
                        onChange={(e) => handleRegionChange(Number(e.target.value))}
                        required
                      >
                        {regionesRegistro.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3 col-6 col-md-6">
                      <label htmlFor="comunaSelect" className="form-label">
                        Comuna<small className="text-danger">*</small>
                      </label>
                      <select
                        className="form-select"
                        id="comunaSelect"
                        value={comunaId}
                        onChange={(e) => setComunaId(Number(e.target.value))}
                        required
                      >
                        {comunasFiltradas.map((comuna) => (
                          <option key={comuna.id} value={comuna.id}>
                            {comuna.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="indicaciones" className="form-label">
                        Indicaciones para la entrega (opcional)
                      </label>
                      <textarea
                        className="form-control"
                        id="indicaciones"
                        rows={3}
                        placeholder="Ej.: Entre calles, color del edificio..."
                        value={indicaciones}
                        onChange={(e) => setIndicaciones(e.target.value)}
                      />
                    </div>
                  </div>

                  {mensajeExito && (
                    <p
                      id="mensaje_exito"
                      style={{ color: "#198754", fontWeight: "bold" }}
                      className="my-2"
                    >
                      {mensajeExito}
                    </p>
                  )}

                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleReset}
                    >
                      Limpiar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}