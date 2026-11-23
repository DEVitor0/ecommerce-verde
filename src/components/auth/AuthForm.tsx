"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import {
  FaApple,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import {
  validateEmail,
  validateName,
  validateNewPassword,
  type FieldError,
} from "@/lib/validators";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, loginUser, registerUser } from "@/store/slices/authSlice";
import { showToast } from "@/store/slices/uiSlice";
import styles from "./Auth.module.css";

export type AuthMode = "login" | "register" | "recover";

const COPY = {
  login: {
    crumb: "Login",
    submit: "Entrar",
    image: "/images/auth/login.webp",
    lead: "Entre para favoritar plantas e acompanhar seus pedidos.",
  },
  register: {
    crumb: "Registro",
    submit: "Criar conta",
    image: "/images/auth/registro.webp",
    lead: "Crie sua conta em poucos segundos.",
  },
  recover: {
    crumb: "Recuperar senha",
    submit: "Enviar instruções",
    image: "/images/auth/login.webp",
    lead: "Informe o e-mail da sua conta para receber as instruções.",
  },
} as const;

type Errors = { name?: string; email?: string; password?: string };

export function AuthForm({ mode }: { mode: AuthMode }) {
  const copy = COPY[mode];
  const id = useId();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [recovered, setRecovered] = useState(false);
  const loading = status === "loading";

  const clear = (key: keyof Errors) => {
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (error) dispatch(clearAuthError());
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found: Errors = {};
    const collect = (key: keyof Errors, result: FieldError) => {
      if (result) found[key] = result;
    };
    if (mode === "register") collect("name", validateName(name));
    collect("email", validateEmail(email));
    if (mode === "register") collect("password", validateNewPassword(password));
    if (mode === "login" && !password) collect("password", "Digite sua senha.");
    setErrors(found);
    const first = (["name", "email", "password"] as const).find((k) => found[k]);
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    if (mode === "recover") {
      setRecovered(true);
      return;
    }

    const action =
      mode === "register"
        ? await dispatch(registerUser({ name, email, password }))
        : await dispatch(loginUser({ email, password }));

    if (registerUser.fulfilled.match(action) || loginUser.fulfilled.match(action)) {
      dispatch(
        showToast({
          kind: "success",
          message: `Olá, ${action.payload.name.split(" ")[0]}! Você está conectado.`,
        }),
      );
      router.push("/");
    }
  };

  const inputProps = (key: keyof Errors) => ({
    id: `${id}-${key}`,
    className: "input",
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });

  const fieldError = (key: keyof Errors) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="field-error" role="alert">
        {errors[key]}
      </p>
    ) : null;

  const label = (key: keyof Errors, text: string) => (
    <label htmlFor={`${id}-${key}`} className="sr-only">
      {text}
    </label>
  );

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.form}>
          <h1 className={styles.title}>
            <Link href="/">Home/</Link> {copy.crumb}
          </h1>

          <form onSubmit={submit} noValidate>
            {mode === "register" && (
              <>
                <div className={styles.box}>
                  <FaUser aria-hidden="true" />
                  {label("name", "Nome")}
                  <input
                    {...inputProps("name")}
                    value={name}
                    placeholder="Digite seu nome"
                    autoComplete="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      clear("name");
                    }}
                  />
                </div>
                {fieldError("name")}
              </>
            )}

            <div className={styles.box}>
              <FaEnvelope aria-hidden="true" />
              {label("email", "E-mail")}
              <input
                {...inputProps("email")}
                type="email"
                value={email}
                placeholder="Digite seu email"
                autoComplete={mode === "register" ? "off" : "email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clear("email");
                }}
              />
            </div>
            {fieldError("email")}

            {mode !== "recover" && (
              <>
                <div className={styles.box}>
                  <FaLock aria-hidden="true" />
                  {label("password", "Senha")}
                  <input
                    {...inputProps("password")}
                    type={show ? "text" : "password"}
                    value={password}
                    placeholder={mode === "register" ? "Crie uma senha" : "Digite sua senha"}
                    autoComplete={mode === "register" ? "new-password" : "current-password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clear("password");
                    }}
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={show}
                    onClick={() => setShow((v) => !v)}
                  >
                    {show ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                  </button>
                </div>
                {mode === "register" && !errors.password && (
                  <p className={styles.hint}>Use 8 ou mais caracteres, com letras e números.</p>
                )}
                {fieldError("password")}
              </>
            )}

            {mode === "login" && (
              <div className={styles.forgot}>
                <Link href="/recuperar-senha">Esqueceu a senha ?</Link>
              </div>
            )}

            {error && (
              <p className={styles.alert} role="alert">
                {error}
              </p>
            )}
            {recovered && (
              <p className={styles.ok} role="status">
                Se existir uma conta com {email}, você receberá as instruções. (Demonstração: nenhum
                e-mail é enviado.)
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
              {loading ? "Aguarde…" : copy.submit}
            </button>

            {mode !== "recover" && (
              <>
                <div className={styles.or}> ou </div>
                <div className={styles.social}>
                  {[
                    { icon: FaApple, name: "Apple" },
                    { icon: FaGoogle, name: "Google" },
                    { icon: FaFacebookF, name: "Facebook" },
                  ].map(({ icon: Icon, name: provider }) => (
                    <button
                      key={provider}
                      type="button"
                      aria-label={`Continuar com ${provider}`}
                      onClick={() =>
                        dispatch(
                          showToast({
                            kind: "info",
                            message: `Login com ${provider} chega em breve.`,
                          }),
                        )
                      }
                    >
                      <Icon aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className={styles.switch}>
              {mode === "login" && (
                <>
                  Não tem uma conta ? <Link href="/criar-conta">Crie uma agora</Link>
                </>
              )}
              {mode === "register" && (
                <>
                  Já possui uma conta ? <Link href="/login">Conecte-se aqui</Link>
                </>
              )}
              {mode === "recover" && (
                <>
                  Lembrou a senha ? <Link href="/login">Voltar ao login</Link>
                </>
              )}
            </div>
          </form>
        </div>
        <div className={styles.imageSide}>
          <Image
            src={copy.image}
            alt=""
            width={1000}
            height={1000}
            sizes="(max-width: 779px) 90vw, 400px"
            priority
          />
        </div>
      </div>
    </main>
  );
}
