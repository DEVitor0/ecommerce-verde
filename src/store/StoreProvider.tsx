"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { attachPersistence, hydrateStore } from "./persistence";

export function StoreProvider({ children }: { children: ReactNode }) {
  // Inicializador lazy: uma store por montagem do provider, nunca compartilhada entre requisições.
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    // Hidratar depois da montagem mantém o HTML do servidor idêntico ao primeiro render do cliente.
    hydrateStore(store);
    return attachPersistence(store);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
