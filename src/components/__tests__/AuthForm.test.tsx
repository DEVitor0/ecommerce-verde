import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "../auth/AuthForm";
import { renderWithStore } from "@/test/utils";

const push = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push, replace: jest.fn() }) }));

beforeEach(() => push.mockClear());

describe("AuthForm — cadastro", () => {
  it("mostra erros de validação sem enviar", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<AuthForm mode="register" />);
    await user.click(screen.getByRole("button", { name: "Criar conta" }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Crie uma senha.")).toBeInTheDocument();
    expect(store.getState().auth.user).toBeNull();
    expect(screen.getByLabelText("Nome")).toHaveFocus();
  });

  it("cria a conta, conecta e redireciona para a home", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<AuthForm mode="register" />);
    await user.type(screen.getByLabelText("Nome"), "Ana Souza");
    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "segredo123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
    expect(store.getState().auth.user?.name).toBe("Ana Souza");
    expect(store.getState().ui.toasts[0]?.message).toMatch(/Olá, Ana/);
  });

  it("alterna a visibilidade da senha", async () => {
    const user = userEvent.setup();
    renderWithStore(<AuthForm mode="register" />);
    const input = screen.getByLabelText("Senha");
    expect(input).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(input).toHaveAttribute("type", "text");
  });
});

describe("AuthForm — login", () => {
  it("recusa credenciais erradas com mensagem clara", async () => {
    const user = userEvent.setup();
    renderWithStore(<AuthForm mode="login" />);
    await user.type(screen.getByLabelText("E-mail"), "ninguem@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "qualquer123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/incorretos/);
    expect(push).not.toHaveBeenCalled();
  });

  it("não depende de endereço fixo: redireciona por rota relativa", async () => {
    const user = userEvent.setup();
    const first = renderWithStore(<AuthForm mode="register" />);
    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "segredo123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));
    await waitFor(() => expect(push).toHaveBeenCalled());
    first.unmount();
    push.mockClear();

    renderWithStore(<AuthForm mode="login" />);
    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "segredo123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
  });
});
