import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { generateSalt, hashPassword, verifyPassword } from "@/lib/password";
import { getStoredUsers, saveStoredUsers } from "@/lib/userStore";
import type { SessionUser } from "@/types";

export interface AuthState {
  user: SessionUser | null;
  status: "idle" | "loading";
  error: string | null;
}

export const initialAuthState: AuthState = { user: null, status: "idle", error: null };

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const registerUser = createAsyncThunk<
  SessionUser,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  const users = getStoredUsers();
  const normalized = normalizeEmail(email);
  if (users.some((u) => u.email === normalized)) {
    return rejectWithValue("Já existe uma conta com este e-mail. Tente entrar.");
  }
  const salt = generateSalt();
  const user = {
    id: nanoid(),
    name: name.trim(),
    email: normalized,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };
  saveStoredUsers([...users, user]);
  return { id: user.id, name: user.name, email: user.email };
});

export const loginUser = createAsyncThunk<
  SessionUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  const user = getStoredUsers().find((u) => u.email === normalizeEmail(email));
  // Mesma mensagem para e-mail inexistente e senha errada: não revela quais e-mails têm conta.
  const failure = "E-mail ou senha incorretos. Confira os dados e tente de novo.";
  if (!user) return rejectWithValue(failure);
  if (!(await verifyPassword(password, user.salt, user.passwordHash)))
    return rejectWithValue(failure);
  return { id: user.id, name: user.name, email: user.email };
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout() {
      return initialAuthState;
    },
    clearAuthError(state) {
      state.error = null;
    },
    hydrateSession(state, action: PayloadAction<SessionUser | null | undefined>) {
      const user = action.payload;
      state.user = user && user.id && user.email ? user : null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: AuthState) => {
      state.status = "loading";
      state.error = null;
    };
    const fulfilled = (state: AuthState, action: PayloadAction<SessionUser>) => {
      state.status = "idle";
      state.user = action.payload;
    };
    const rejected = (state: AuthState, action: { payload?: string }) => {
      state.status = "idle";
      state.error = action.payload ?? "Não foi possível concluir. Tente novamente.";
    };
    builder
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, fulfilled)
      .addCase(registerUser.rejected, rejected)
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected);
  },
});

export const { logout, clearAuthError, hydrateSession } = authSlice.actions;
export default authSlice.reducer;
