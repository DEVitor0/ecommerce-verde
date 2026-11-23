import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type RootState } from "@/store";

export function renderWithStore(
  ui: ReactElement,
  {
    preloadedState,
    ...options
  }: { preloadedState?: Partial<RootState> } & Omit<RenderOptions, "wrapper"> = {},
) {
  const store = makeStore(preloadedState);
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}

export const loggedInUser = { id: "u1", name: "Ana Souza", email: "ana@exemplo.com" };

export const authedState: Partial<RootState> = {
  auth: { user: loggedInUser, status: "idle", error: null },
};
