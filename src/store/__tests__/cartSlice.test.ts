import { makeStore } from "..";
import { selectCartCount, selectCartTotals, selectDetailedCart } from "../selectors";
import {
  addItem,
  clearCart,
  hydrateCart,
  MAX_QUANTITY_PER_ITEM,
  removeItem,
  setCoupon,
  setQuantity,
} from "../slices/cartSlice";

describe("cartSlice", () => {
  it("adiciona itens e soma quantidades do mesmo produto", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p01" }));
    store.dispatch(addItem({ productId: "p01", quantity: 2 }));
    expect(store.getState().cart.lines).toEqual([{ productId: "p01", quantity: 3 }]);
    expect(selectCartCount(store.getState())).toBe(3);
  });

  it("ignora produtos que não existem", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "inexistente" }));
    expect(store.getState().cart.lines).toEqual([]);
  });

  it("limita a quantidade por item", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p01", quantity: 50 }));
    expect(store.getState().cart.lines[0]?.quantity).toBe(MAX_QUANTITY_PER_ITEM);
  });

  it("altera e remove quantidades; zero remove o item", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p01" }));
    store.dispatch(setQuantity({ productId: "p01", quantity: 4 }));
    expect(store.getState().cart.lines[0]?.quantity).toBe(4);
    store.dispatch(setQuantity({ productId: "p01", quantity: 0 }));
    expect(store.getState().cart.lines).toEqual([]);
  });

  it("remove o cupom quando o carrinho esvazia", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p01" }));
    store.dispatch(setCoupon("verde10"));
    expect(store.getState().cart.couponCode).toBe("VERDE10");
    store.dispatch(removeItem("p01"));
    expect(store.getState().cart.couponCode).toBeNull();
  });

  it("limpa o carrinho", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p01" }));
    store.dispatch(clearCart());
    expect(store.getState().cart).toEqual({ lines: [], couponCode: null });
  });

  it("reidrata descartando dados inválidos", () => {
    const store = makeStore();
    store.dispatch(
      hydrateCart({
        lines: [
          { productId: "p02", quantity: 2 },
          { productId: "removido", quantity: 1 },
          { productId: "p03", quantity: Number.NaN },
        ],
        couponCode: "VERDE10",
      }),
    );
    expect(store.getState().cart.lines).toEqual([{ productId: "p02", quantity: 2 }]);
    expect(store.getState().cart.couponCode).toBe("VERDE10");
  });
});

describe("selectors do carrinho", () => {
  it("calcula subtotal, desconto e total com cupom (valores em centavos, sem erro de ponto flutuante)", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p02", quantity: 2 })); // 2 x 20,00
    store.dispatch(addItem({ productId: "p07" })); // 30,00
    store.dispatch(setCoupon("VERDE10"));
    const totals = selectCartTotals(store.getState());
    expect(totals.subtotal).toBe(7000);
    expect(totals.discount).toBe(700);
    expect(totals.total).toBe(6300);
    expect(selectDetailedCart(store.getState())).toHaveLength(2);
  });

  it("deixa de aplicar o cupom quando o mínimo deixa de ser atendido", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p06", quantity: 2 })); // 154,00
    store.dispatch(setCoupon("BEMVINDO15"));
    expect(selectCartTotals(store.getState()).discount).toBe(1500);
    store.dispatch(setQuantity({ productId: "p06", quantity: 1 })); // 77,00
    const totals = selectCartTotals(store.getState());
    expect(totals.discount).toBe(0);
    expect(totals.coupon).toMatchObject({ status: "invalid", reason: "min-subtotal" });
  });
});
