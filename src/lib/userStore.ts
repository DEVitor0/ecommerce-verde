import { readStorage, writeStorage } from "./storage";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
}

const USERS_KEY = "users";

/**
 * Armazenamento de contas em localStorage, só para demonstração no navegador.
 * Em produção, troque estas duas funções por chamadas a uma API com sessão
 * em cookie httpOnly: nenhum outro código precisa mudar.
 */
export function getStoredUsers(): StoredUser[] {
  return readStorage<StoredUser[]>(USERS_KEY, []);
}

export function saveStoredUsers(users: StoredUser[]): void {
  writeStorage(USERS_KEY, users);
}
