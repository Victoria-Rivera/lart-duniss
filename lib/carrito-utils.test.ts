// lib/carrito-utils.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import { agregarProductoAlCarrito, calcularTotalCarrito } from "./carrito-utils";

describe("Lógica del carrito de compras", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("calcula el total sumando precio por cantidad", () => {
    const total = calcularTotalCarrito([
      { id: 1, nombre: "Galletas", precio_nuevo: 4200, stock: 10, quantity: 2 },
      { id: 2, nombre: "Cupcakes", precio_nuevo: 5500, stock: 8, quantity: 1 },
    ]);

    expect(total).toBe(13900);
  });

  it("añade un producto y permite mockear localStorage para persistirlo", () => {
    const setItemMock = vi.spyOn(Storage.prototype, "setItem");

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
    expect(setItemMock).toHaveBeenCalledTimes(1);
  });

  it("bloquea superar el stock disponible", () => {
    const inicial = [
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
});