import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "../cart/CartDrawer";
import type { RootState } from "@/store";
import { initialAuthState } from "@/store/slices/authSlice";
import { initialUiState } from "@/store/slices/uiSlice";
import { initialWishlistState } from "@/store/slices/wishlistSlice";
import { renderWithStore } from "@/test/utils";

const state = (
  lines: Array<{ productId: string; quantity: number }>,
  couponCode: string | null = null,
): Partial<RootState> => ({
  cart: { lines, couponCode },
  ui: { ...initialUiState, cartOpen: true },
  auth: initialAuthState,
  wishlist: initialWishlistState,
});

describe("CartDrawer", () => {
  it("mostra o estado vazio com orientação", () => {
    renderWithStore(<CartDrawer />, { preloadedState: state([]) });
    expect(screen.getByRole("dialog", { name: "Carrinho" })).toBeInTheDocument();
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver todas as plantas" })).toHaveAttribute(
      "href",
      "/produtos",
    );
  });

  it("lista itens e calcula o total", () => {
    renderWithStore(<CartDrawer />, {
      preloadedState: state([
        { productId: "p02", quantity: 2 },
        { productId: "p07", quantity: 1 },
      ]),
    });
    expect(screen.getByRole("heading", { name: /Carrinho/ })).toHaveTextContent("(3)");
    const total = screen.getByText("Total").parentElement!;
    expect(total).toHaveTextContent(/R\$\s70,00/);
    expect(screen.getByRole("link", { name: "Finalizar compra" })).toHaveAttribute(
      "href",
      "/checkout",
    );
  });

  it("altera a quantidade pelos botões", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<CartDrawer />, {
      preloadedState: state([{ productId: "p02", quantity: 1 }]),
    });
    await user.click(screen.getByRole("button", { name: "Aumentar quantidade" }));
    expect(store.getState().cart.lines[0]?.quantity).toBe(2);
    await user.click(screen.getByRole("button", { name: "Diminuir quantidade" }));
    expect(store.getState().cart.lines[0]?.quantity).toBe(1);
  });

  it("remove um item após a animação de saída", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { store } = renderWithStore(<CartDrawer />, {
      preloadedState: state([{ productId: "p02", quantity: 1 }]),
    });
    await user.click(screen.getByRole("button", { name: "Remover Agave-dragão" }));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(store.getState().cart.lines).toEqual([]);
    jest.useRealTimers();
  });

  it("aplica um cupom válido e mostra o desconto", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<CartDrawer />, {
      preloadedState: state([{ productId: "p06", quantity: 2 }]),
    });
    await user.click(screen.getByRole("button", { name: /Adicionar cupom de desconto/ }));
    await user.type(screen.getByLabelText("Código do cupom"), "verde10");
    await user.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(store.getState().cart.couponCode).toBe("VERDE10");
    expect(screen.getByText("Desconto").parentElement).toHaveTextContent(/R\$\s15,40/);
  });

  it("explica o erro de um cupom inexistente", async () => {
    const user = userEvent.setup();
    renderWithStore(<CartDrawer />, { preloadedState: state([{ productId: "p02", quantity: 1 }]) });
    await user.click(screen.getByRole("button", { name: /Adicionar cupom de desconto/ }));
    await user.type(screen.getByLabelText("Código do cupom"), "FALSO");
    await user.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(within(screen.getByRole("dialog")).getByRole("alert")).toHaveTextContent(/não existe/);
  });

  it("esvazia o carrinho", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<CartDrawer />, {
      preloadedState: state([{ productId: "p02", quantity: 1 }]),
    });
    await user.click(screen.getByRole("button", { name: "Excluir todos os itens do carrinho" }));
    expect(store.getState().cart.lines).toEqual([]);
  });

  it("fecha com Esc", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<CartDrawer />, { preloadedState: state([]) });
    await user.keyboard("{Escape}");
    expect(store.getState().ui.cartOpen).toBe(false);
  });
});
