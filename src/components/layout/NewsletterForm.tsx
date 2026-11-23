"use client";

import { useId, useState, type FormEvent } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useT } from "@/lib/i18n";
import { validateEmail } from "@/lib/validators";
import styles from "./Footer.module.css";

export function NewsletterForm() {
  const t = useT();
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const problem = validateEmail(email);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setDone(email.trim());
    setEmail("");
  };

  if (done) {
    return (
      <p className={styles.success} role="status">
        <FaCircleCheck aria-hidden="true" />
        {t("newsletter.success", { email: done })}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.formRow}>
        <label htmlFor={id} className="sr-only">
          {t("newsletter.placeholder")}
        </label>
        <input
          id={id}
          type="email"
          value={email}
          placeholder={t("newsletter.placeholder")}
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
        />
        <button type="submit" className="btn btn-primary btn-sm">
          {t("newsletter.submit")}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
