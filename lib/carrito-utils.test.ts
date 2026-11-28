import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  agregarProductoAlCarrito,
  calcularTotalCarrito,
  type ItemCarrito,
} from "./carrito-utils";

describe("Lógica del carrito de compras", () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    });
  });

  it("calcula el total sumando precio por cantidad", () => {
    const items: ItemCarrito[] = [
      { id: 1, nombre: "Galletas", precio_nuevo: 4200, stock: 10, quantity: 2 },
      { id: 2, nombre: "Cupcakes", precio_nuevo: 5500, stock: 8, quantity: 1 },
    ];

    expect(calcularTotalCarrito(items)).toBe(13900);
  });

  it("añade un producto y permite mockear localStorage para persistirlo", () => {
    const { carrito, error } = agregarProductoAlCarrito([], {
      id: 1,
      nombre: "Galletas Chispas Artesanales",
      precio_nuevo: 4200,
      stock: 5,
    });

    localStorage.setItem("cart", JSON.stringify(carrito));

    expect(error).toBeUndefined();
    expect(carrito).toHaveLength(1);
    expect(carrito[0].quantity).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("bloquea superar el stock disponible", () => {
    const inicial: ItemCarrito[] = [
      { id: 1, nombre: "Galletas", precio_nuevo: 4200, stock: 2, quantity: 2 },
    ];

    const { carrito, error } = agregarProductoAlCarrito(inicial, {
      id: 1,
      nombre: "Galletas",
      precio_nuevo: 4200,
      stock: 2,
    });

    expect(carrito).toEqual(inicial);
    expect(error).toContain("2 unidades");
  });

  it("retorna error si el producto no tiene stock", () => {
    const { carrito, error } = agregarProductoAlCarrito([], {
      id: 3,
      nombre: "Torta Tres Leches",
      precio_nuevo: 12000,
      stock: 0,
    });

    expect(carrito).toEqual([]);
    expect(error).toContain("agotado");
  });
});