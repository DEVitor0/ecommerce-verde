import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "../product/ProductCard";
import { getProductBySlug } from "@/data/products";
import { authedState, renderWithStore } from "@/test/utils";

const product = getProductBySlug("agave-dragao")!;

describe("ProductCard", () => {
  it("mostra nome, preço atual, preço antigo e selo de desconto", () => {
    renderWithStore(<ProductCard product={product} />);
    expect(screen.getByRole("link", { name: "Agave-dragão" })).toHaveAttribute(
      "href",
      "/produto/agave-dragao",
    );
    expect(screen.getByText(/R\$\s20,00/)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s66,00/)).toBeInTheDocument();
    expect(screen.getByLabelText("70% de desconto")).toBeInTheDocument();
  });

  it("adiciona ao carrinho, avisa com toast e remove no segundo clique", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={product} />);

    await user.click(screen.getByRole("button", { name: /Adicionar ao carrinho: Agave-dragão/ }));
    expect(store.getState().cart.lines).toEqual([{ productId: "p02", quantity: 1 }]);
    expect(store.getState().ui.toasts[0]?.message).toMatch(/foi para o carrinho/);

    const toggle = screen.getByRole("button", { name: /Remover do carrinho: Agave-dragão/ });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    await user.click(toggle);
    expect(store.getState().cart.lines).toEqual([]);
  });

  it("pede login ao favoritar sem estar conectado", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={product} />);
    await user.click(screen.getByRole("button", { name: /Adicionar aos favoritos/ }));
    expect(store.getState().ui.loginPrompt).toBe("wishlist");
    expect(store.getState().wishlist.ids).toEqual([]);
  });

  it("favorita quando a pessoa está conectada", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={product} />, {
      preloadedState: authedState,
    });
    await user.click(screen.getByRole("button", { name: /Adicionar aos favoritos/ }));
    expect(store.getState().wishlist.ids).toEqual(["p02"]);
    expect(screen.getByRole("button", { name: /Remover dos favoritos/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("abre a visualização rápida", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={product} />);
    await user.click(screen.getByRole("button", { name: /Visualização rápida/ }));
    expect(store.getState().ui.quickViewProductId).toBe("p02");
  });

  it("converte o preço quando a moeda muda", () => {
    renderWithStore(<ProductCard product={product} />, {
      preloadedState: {
        ui: {
          cartOpen: false,
          searchOpen: false,
          mobileNavOpen: false,
          quickViewProductId: null,
          loginPrompt: null,
          currency: "USD",
          locale: "en-US",
          toasts: [],
        },
      },
    });
    expect(screen.getByText("$3.60")).toBeInTheDocument();
    expect(screen.getByLabelText("70% off")).toBeInTheDocument();
  });
});
