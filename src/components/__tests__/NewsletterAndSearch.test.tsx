import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "../layout/NewsletterForm";
import { SearchOverlay } from "../search/SearchOverlay";
import { initialUiState } from "@/store/slices/uiSlice";
import { renderWithStore } from "@/test/utils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe("NewsletterForm", () => {
  it("valida o e-mail antes de enviar", async () => {
    const user = userEvent.setup();
    renderWithStore(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText("Insira seu e-mail aqui"), "invalido");
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/válido/);
  });

  it("confirma a inscrição com o e-mail informado", async () => {
    const user = userEvent.setup();
    renderWithStore(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText("Insira seu e-mail aqui"), "ana@exemplo.com");
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByRole("status")).toHaveTextContent("ana@exemplo.com");
  });
});

describe("SearchOverlay", () => {
  const open = { ui: { ...initialUiState, searchOpen: true } };

  it("sugere atalhos antes de digitar", () => {
    renderWithStore(<SearchOverlay />, { preloadedState: open });
    expect(screen.getByRole("link", { name: "Para escritório" })).toBeInTheDocument();
  });

  it("encontra plantas ignorando acentos", async () => {
    const user = userEvent.setup();
    renderWithStore(<SearchOverlay />, { preloadedState: open });
    await user.type(screen.getByRole("searchbox", { name: "Buscar plantas" }), "estrelicia");
    expect(await screen.findByRole("link", { name: /Estrelícia/ })).toHaveAttribute(
      "href",
      "/produto/estrelicia",
    );
  });

  it("avisa quando nada é encontrado", async () => {
    const user = userEvent.setup();
    renderWithStore(<SearchOverlay />, { preloadedState: open });
    await user.type(screen.getByRole("searchbox"), "zzzz");
    expect(await screen.findByRole("status")).toHaveTextContent(/Nenhuma planta encontrada/);
  });
});
