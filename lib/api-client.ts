const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";

export function guardarSesion(token: string, usuario?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
  if (usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }
}

export function obtenerToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function cerrarSesion() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  requiereAuth = true
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (requiereAuth) {
    const token = obtenerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}