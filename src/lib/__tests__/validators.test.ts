import {
  formatCep,
  formatPhone,
  isValidEmail,
  validateCep,
  validateEmail,
  validateName,
  validateNewPassword,
  validatePhone,
} from "../validators";

describe("validators", () => {
  it("valida e-mails", () => {
    expect(isValidEmail("ana@exemplo.com")).toBe(true);
    expect(isValidEmail("ana@exemplo")).toBe(false);
    expect(isValidEmail("ana exemplo@x.com")).toBe(false);
    expect(validateEmail("")).toMatch(/Informe/);
    expect(validateEmail("abc")).toMatch(/válido/);
    expect(validateEmail("ana@exemplo.com")).toBeNull();
  });

  it("valida nome", () => {
    expect(validateName(" ")).toMatch(/Informe/);
    expect(validateName("A")).toMatch(/2 letras/);
    expect(validateName("Ana")).toBeNull();
  });

  it("exige senha forte no cadastro", () => {
    expect(validateNewPassword("")).toMatch(/Crie/);
    expect(validateNewPassword("abc123")).toMatch(/8 caracteres/);
    expect(validateNewPassword("abcdefgh")).toMatch(/letras e números/);
    expect(validateNewPassword("abcdefg1")).toBeNull();
  });

  it("formata e valida CEP", () => {
    expect(formatCep("12345678")).toBe("12345-678");
    expect(formatCep("123")).toBe("123");
    expect(validateCep("12345-678")).toBeNull();
    expect(validateCep("1234")).toMatch(/8 números/);
  });

  it("formata e valida telefone", () => {
    expect(formatPhone("11987654321")).toBe("(11) 98765-4321");
    expect(formatPhone("1133334444")).toBe("(11) 3333-4444");
    expect(validatePhone("(11) 98765-4321")).toBeNull();
    expect(validatePhone("98765")).toMatch(/DDD/);
  });
});
