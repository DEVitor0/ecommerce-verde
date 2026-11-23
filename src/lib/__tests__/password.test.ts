import { generateSalt, hashPassword, verifyPassword } from "../password";

describe("password", () => {
  it("gera salts diferentes", () => {
    expect(generateSalt()).not.toBe(generateSalt());
    expect(generateSalt()).toHaveLength(32);
  });

  it("produz hash determinístico para o mesmo salt e nunca expõe a senha", async () => {
    const hash = await hashPassword("segredo123", "salt");
    expect(hash).toBe(await hashPassword("segredo123", "salt"));
    expect(hash).not.toContain("segredo123");
    expect(hash).toHaveLength(64);
  });

  it("verifica senhas corretas e rejeita incorretas", async () => {
    const salt = generateSalt();
    const hash = await hashPassword("segredo123", salt);
    expect(await verifyPassword("segredo123", salt, hash)).toBe(true);
    expect(await verifyPassword("errada", salt, hash)).toBe(false);
  });
});
