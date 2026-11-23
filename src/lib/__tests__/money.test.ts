import { convertFromBRL, discountPercent, formatMoney, installmentValue } from "../money";

describe("money", () => {
  it("formata centavos em reais no padrão brasileiro", () => {
    expect(formatMoney(4800).replace(/\s/g, " ")).toBe("R$ 48,00");
    expect(formatMoney(123456).replace(/\s/g, " ")).toBe("R$ 1.234,56");
  });

  it("converte para outras moedas usando as taxas indicativas", () => {
    expect(convertFromBRL(10000, "USD")).toBe(1800);
    expect(formatMoney(10000, "USD", "en-US")).toBe("$18.00");
  });

  it("calcula o percentual de desconto inteiro", () => {
    expect(discountPercent(3000, 6000)).toBe(50);
    expect(discountPercent(9000, 10000)).toBe(10);
    expect(discountPercent(4800, 8000)).toBe(40);
  });

  it("não informa desconto sem preço de comparação ou quando ele é menor", () => {
    expect(discountPercent(3000)).toBe(0);
    expect(discountPercent(3000, 2000)).toBe(0);
  });

  it("arredonda a parcela para cima para nunca ficar abaixo do preço", () => {
    expect(installmentValue(1000, 6)).toBe(167);
    expect(installmentValue(1200, 6)).toBe(200);
  });
});
