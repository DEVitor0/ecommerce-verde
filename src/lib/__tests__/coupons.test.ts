import { evaluateCoupon, normalizeCouponCode } from "../coupons";

describe("evaluateCoupon", () => {
  it("normaliza o código", () => {
    expect(normalizeCouponCode("  verde10 ")).toBe("VERDE10");
  });

  it("aplica cupom percentual", () => {
    expect(evaluateCoupon("verde10", 5000)).toMatchObject({ status: "valid", discount: 500 });
  });

  it("aplica cupom de valor fixo acima do mínimo", () => {
    expect(evaluateCoupon("BEMVINDO15", 10000)).toMatchObject({ status: "valid", discount: 1500 });
  });

  it("recusa cupom abaixo do valor mínimo", () => {
    expect(evaluateCoupon("BEMVINDO15", 9999)).toEqual({
      status: "invalid",
      code: "BEMVINDO15",
      reason: "min-subtotal",
      minSubtotal: 10000,
    });
  });

  it("recusa cupom inexistente ou vazio", () => {
    expect(evaluateCoupon("NAOEXISTE", 5000)).toMatchObject({
      status: "invalid",
      reason: "unknown",
    });
    expect(evaluateCoupon("", 5000)).toMatchObject({ status: "invalid", reason: "empty" });
    expect(evaluateCoupon(null, 5000)).toMatchObject({ status: "invalid", reason: "empty" });
  });

  it("nunca desconta mais que o subtotal", () => {
    expect(evaluateCoupon("VERDE10", 0)).toMatchObject({ discount: 0 });
  });
});
