"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { FaBarcode, FaCreditCard, FaPix } from "react-icons/fa6";
import { usePrice } from "@/hooks/usePrice";
import { useT } from "@/lib/i18n";
import { PAYMENT_LABELS, type PaymentMethod } from "@/lib/orders";
import {
  formatCep,
  formatPhone,
  validateCep,
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
  type FieldError,
} from "@/lib/validators";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotals, selectDetailedCart, selectUser } from "@/store/selectors";
import { placeOrder } from "@/store/thunks/placeOrder";
import styles from "./Checkout.module.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

type Errors = Partial<Record<keyof FormState, NonNullable<FieldError>>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

const PAYMENTS: Array<{ id: PaymentMethod; icon: typeof FaPix; hint: string }> = [
  { id: "pix", icon: FaPix, hint: "Aprovação imediata" },
  { id: "cartao", icon: FaCreditCard, hint: "Em até 6x sem juros" },
  { id: "boleto", icon: FaBarcode, hint: "Vence em 3 dias úteis" },
];

function validate(values: FormState): Errors {
  const checks: Array<[keyof FormState, FieldError]> = [
    ["name", validateName(values.name)],
    ["email", validateEmail(values.email)],
    ["phone", validatePhone(values.phone)],
    ["cep", validateCep(values.cep)],
    ["street", validateRequired(values.street, "Informe a rua.")],
    ["number", validateRequired(values.number, "Informe o número.")],
    ["city", validateRequired(values.city, "Informe a cidade.")],
    ["state", values.state.trim().length === 2 ? null : "Use a sigla do estado, como SP."],
  ];
  return Object.fromEntries(checks.filter(([, error]) => error)) as Errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const t = useT();
  const baseId = useId();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const format = usePrice();
  const lines = useAppSelector(selectDetailedCart);
  const { subtotal, discount, total } = useAppSelector(selectCartTotals);
  const user = useAppSelector(selectUser);
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Preenche nome e e-mail da conta conectada, sem sobrescrever o que a pessoa já digitou.
  const [prefilled, setPrefilled] = useState(false);
  if (user && !prefilled) {
    setPrefilled(true);
    setValues((v) => ({ ...v, name: v.name || user.name, email: v.email || user.email }));
  }

  const set =
    (key: keyof FormState, transform?: (v: string) => string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = transform ? transform(event.target.value) : event.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    };

  const field = (key: keyof FormState) => ({
    id: `${baseId}-${key}`,
    value: values[key],
    onChange: set(key),
    className: "input",
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${baseId}-${key}-error` : undefined,
  });

  if (lines.length === 0 && !submitting) {
    return (
      <div className={styles.empty}>
        <h2>{t("cart.emptyTitle")}</h2>
        <p>{t("cart.emptyText")}</p>
        <Link href="/produtos" className="btn btn-primary">
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${baseId}-${firstInvalid}`)?.focus();
      return;
    }
    setSubmitting(true);
    setFormError(null);
    const result = await dispatch(
      placeOrder({
        customer: { name: values.name.trim(), email: values.email.trim(), phone: values.phone },
        address: {
          cep: values.cep,
          street: values.street.trim(),
          number: values.number.trim(),
          complement: values.complement.trim(),
          city: values.city.trim(),
          state: values.state.trim().toUpperCase(),
        },
        payment,
      }),
    );
    if (placeOrder.fulfilled.match(result)) {
      router.push(`/checkout/sucesso?pedido=${encodeURIComponent(result.payload)}`);
    } else {
      setSubmitting(false);
      setFormError(result.payload ?? "Não foi possível finalizar o pedido. Tente novamente.");
    }
  };

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Seus dados</legend>
          <Field id={`${baseId}-name`} label="Nome completo" error={errors.name}>
            <input {...field("name")} autoComplete="name" />
          </Field>
          <div className={styles.row}>
            <Field id={`${baseId}-email`} label="E-mail" error={errors.email}>
              <input {...field("email")} type="email" autoComplete="email" />
            </Field>
            <Field id={`${baseId}-phone`} label="Telefone com DDD" error={errors.phone}>
              <input
                {...field("phone")}
                onChange={set("phone", formatPhone)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 90000-0000"
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Entrega</legend>
          <div className={styles.row}>
            <Field id={`${baseId}-cep`} label="CEP" error={errors.cep}>
              <input
                {...field("cep")}
                onChange={set("cep", formatCep)}
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
              />
            </Field>
            <Field id={`${baseId}-city`} label="Cidade" error={errors.city}>
              <input {...field("city")} autoComplete="address-level2" />
            </Field>
          </div>
          <Field id={`${baseId}-street`} label="Rua" error={errors.street}>
            <input {...field("street")} autoComplete="address-line1" />
          </Field>
          <div className={`${styles.row} ${styles.row3}`}>
            <Field id={`${baseId}-complement`} label="Complemento (opcional)">
              <input {...field("complement")} autoComplete="address-line2" />
            </Field>
            <Field id={`${baseId}-number`} label="Número" error={errors.number}>
              <input {...field("number")} inputMode="numeric" />
            </Field>
            <Field id={`${baseId}-state`} label="UF" error={errors.state}>
              <input
                {...field("state")}
                onChange={set("state", (v) =>
                  v
                    .replace(/[^a-zA-Z]/g, "")
                    .slice(0, 2)
                    .toUpperCase(),
                )}
                autoComplete="address-level1"
                maxLength={2}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Pagamento</legend>
          <div className={styles.pay}>
            {PAYMENTS.map(({ id, icon: Icon, hint }) => (
              <label key={id} className={styles.payOption}>
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={payment === id}
                  onChange={() => setPayment(id)}
                />
                <Icon className={styles.payIcon} aria-hidden="true" />
                <span className={styles.payText}>
                  {PAYMENT_LABELS[id]}
                  <small>{hint}</small>
                </span>
              </label>
            ))}
          </div>
          <p className={styles.note}>
            Loja de demonstração: nenhum dado de pagamento é coletado e nenhuma cobrança é feita.
          </p>
        </fieldset>

        {formError && (
          <p className={styles.alert} role="alert">
            {formError}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? t("common.loading") : `Confirmar pedido · ${format(total)}`}
        </button>
      </form>

      <aside className={styles.summary} aria-label="Resumo do pedido">
        <h2>{t("cart.summary")}</h2>
        <ul role="list" className={styles.lines}>
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.id} className={styles.line}>
              <span className={styles.thumb}>
                <Image src={product.image} alt="" fill sizes="56px" />
              </span>
              <span>
                {product.name}
                <br />
                <span className={styles.qty}>Qtd. {quantity}</span>
              </span>
              <span>{format(lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className={styles.sum}>
          <span>{t("cart.subtotal")}</span>
          <span>{format(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className={`${styles.sum} ${styles.green}`}>
            <span>{t("cart.discount")}</span>
            <span>− {format(discount)}</span>
          </div>
        )}
        <div className={styles.sum}>
          <span>{t("cart.shipping")}</span>
          <span>{t("cart.free")}</span>
        </div>
        <div className={`${styles.sum} ${styles.sumTotal}`}>
          <span>{t("cart.total")}</span>
          <span>{format(total)}</span>
        </div>
        <p className={styles.note}>
          Valores convertidos são aproximados. A cobrança é feita sempre em reais (BRL).
        </p>
      </aside>
    </div>
  );
}
