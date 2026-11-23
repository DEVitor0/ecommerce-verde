const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export type FieldError = string | null;

export function validateName(value: string): FieldError {
  const name = value.trim();
  if (!name) return "Informe seu nome.";
  if (name.length < 2) return "O nome precisa ter ao menos 2 letras.";
  return null;
}

export function validateEmail(value: string): FieldError {
  if (!value.trim()) return "Informe seu e-mail.";
  if (!isValidEmail(value)) return "Digite um e-mail válido, como nome@exemplo.com.";
  return null;
}

/** Cadastro: mínimo de 8 caracteres, com letra e número. */
export function validateNewPassword(value: string): FieldError {
  if (!value) return "Crie uma senha.";
  if (value.length < 8) return "A senha precisa ter ao menos 8 caracteres.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "Use letras e números na senha.";
  }
  return null;
}

export function validateRequired(value: string, message: string): FieldError {
  return value.trim() ? null : message;
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function validateCep(value: string): FieldError {
  return onlyDigits(value).length === 8 ? null : "Digite um CEP com 8 números.";
}

export function formatPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validatePhone(value: string): FieldError {
  const length = onlyDigits(value).length;
  return length === 10 || length === 11 ? null : "Digite um telefone com DDD.";
}
