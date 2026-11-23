import { makeStore } from "..";
import { selectIsAuthenticated } from "../selectors";
import { clearAuthError, loginUser, logout, registerUser } from "../slices/authSlice";
import {
  dismissToast,
  hydratePreferences,
  openCart,
  openSearch,
  setCurrency,
  showToast,
} from "../slices/uiSlice";
import { hydrateWishlist, toggleWishlist } from "../slices/wishlistSlice";

describe("wishlistSlice", () => {
  it("alterna favoritos e ignora produtos inexistentes", () => {
    const store = makeStore();
    store.dispatch(toggleWishlist("p01"));
    store.dispatch(toggleWishlist("nada"));
    expect(store.getState().wishlist.ids).toEqual(["p01"]);
    store.dispatch(toggleWishlist("p01"));
    expect(store.getState().wishlist.ids).toEqual([]);
  });

  it("reidrata sem duplicatas nem ids inválidos", () => {
    const store = makeStore();
    store.dispatch(hydrateWishlist({ ids: ["p01", "p01", "x"] }));
    expect(store.getState().wishlist.ids).toEqual(["p01"]);
  });
});

describe("authSlice", () => {
  it("cadastra, guarda hash (não a senha) e conecta", async () => {
    const store = makeStore();
    const result = await store.dispatch(
      registerUser({ name: "Ana Souza", email: "Ana@Exemplo.com", password: "segredo123" }),
    );
    expect(registerUser.fulfilled.match(result)).toBe(true);
    expect(store.getState().auth.user).toMatchObject({
      name: "Ana Souza",
      email: "ana@exemplo.com",
    });
    expect(selectIsAuthenticated(store.getState())).toBe(true);

    const raw = window.localStorage.getItem("jardim:users") ?? "";
    expect(raw).not.toContain("segredo123");
    expect(raw).toContain("passwordHash");
  });

  it("impede cadastro duplicado", async () => {
    const store = makeStore();
    await store.dispatch(
      registerUser({ name: "Ana", email: "ana@exemplo.com", password: "segredo123" }),
    );
    store.dispatch(logout());
    await store.dispatch(
      registerUser({ name: "Outra", email: "ANA@exemplo.com", password: "outrasenha1" }),
    );
    expect(store.getState().auth.error).toMatch(/Já existe/);
    expect(store.getState().auth.user).toBeNull();
  });

  it("faz login com a senha certa e recusa a errada com mensagem genérica", async () => {
    const store = makeStore();
    await store.dispatch(
      registerUser({ name: "Ana", email: "ana@exemplo.com", password: "segredo123" }),
    );
    store.dispatch(logout());

    await store.dispatch(loginUser({ email: "ana@exemplo.com", password: "errada123" }));
    const wrongPassword = store.getState().auth.error;
    expect(wrongPassword).toMatch(/incorretos/);
    expect(store.getState().auth.user).toBeNull();

    store.dispatch(clearAuthError());
    await store.dispatch(loginUser({ email: "naoexiste@exemplo.com", password: "qualquer123" }));
    expect(store.getState().auth.error).toBe(wrongPassword);

    await store.dispatch(loginUser({ email: "ana@exemplo.com", password: "segredo123" }));
    expect(store.getState().auth.user?.email).toBe("ana@exemplo.com");
  });
});

describe("uiSlice", () => {
  it("abrir o carrinho fecha a busca e vice-versa", () => {
    const store = makeStore();
    store.dispatch(openSearch());
    store.dispatch(openCart());
    expect(store.getState().ui).toMatchObject({ cartOpen: true, searchOpen: false });
    store.dispatch(openSearch());
    expect(store.getState().ui).toMatchObject({ cartOpen: false, searchOpen: true });
  });

  it("mantém no máximo 3 avisos e permite dispensar", () => {
    const store = makeStore();
    for (let i = 0; i < 5; i++) store.dispatch(showToast({ kind: "info", message: `m${i}` }));
    const toasts = store.getState().ui.toasts;
    expect(toasts.map((t) => t.message)).toEqual(["m2", "m3", "m4"]);
    store.dispatch(dismissToast(toasts[0]!.id));
    expect(store.getState().ui.toasts).toHaveLength(2);
  });

  it("aceita só preferências válidas ao reidratar", () => {
    const store = makeStore();
    store.dispatch(setCurrency("EUR"));
    store.dispatch(hydratePreferences({ currency: "XXX" as never, locale: "en-US" }));
    expect(store.getState().ui).toMatchObject({ currency: "EUR", locale: "en-US" });
  });
});
