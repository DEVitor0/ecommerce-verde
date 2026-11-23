import { products } from "@/data/products";
import {
  buildCatalogHref,
  filterProducts,
  parseFilters,
  PRICE_RANGES,
  searchProducts,
  sortProducts,
} from "../catalog";

const base = { ordem: "relevancia" as const };

describe("parseFilters", () => {
  it("lê filtros válidos da URL", () => {
    expect(
      parseFilters({
        categoria: "interior",
        tamanho: "grande",
        preco: "30-40",
        flores: "1",
        ordem: "nome",
      }),
    ).toEqual({
      q: undefined,
      categoria: "interior",
      tamanho: "grande",
      preco: "30-40",
      uso: undefined,
      flores: true,
      ordem: "nome",
    });
  });

  it("descarta valores desconhecidos e usa a ordenação padrão", () => {
    const parsed = parseFilters({
      categoria: "xyz",
      tamanho: ["media", "grande"],
      ordem: "invalida",
    });
    expect(parsed.categoria).toBeUndefined();
    expect(parsed.tamanho).toBe("media");
    expect(parsed.ordem).toBe("relevancia");
  });
});

describe("buildCatalogHref", () => {
  it("omite filtros vazios e a ordenação padrão", () => {
    expect(buildCatalogHref({})).toBe("/produtos");
    expect(buildCatalogHref({ categoria: "mudas", ordem: "relevancia" })).toBe(
      "/produtos?categoria=mudas",
    );
    expect(buildCatalogHref({ flores: true, ordem: "nome" })).toBe("/produtos?flores=1&ordem=nome");
  });
});

describe("PRICE_RANGES", () => {
  it("cobre todos os produtos exatamente uma vez (sem lacunas, como R$ 50 a 60 no site antigo)", () => {
    for (const product of products) {
      const matches = PRICE_RANGES.filter((r) => product.price >= r.min && product.price < r.max);
      expect(matches).toHaveLength(1);
    }
  });

  it("inclui o produto de exatamente R$ 60,00 na faixa 'R$ 60 ou mais'", () => {
    const result = filterProducts(products, { ...base, preco: "60+" });
    expect(result.map((p) => p.slug)).toContain("costela-de-adao");
  });
});

describe("filterProducts", () => {
  it("filtra por categoria, tamanho e uso combinados", () => {
    const result = filterProducts(products, {
      ...base,
      categoria: "interior",
      tamanho: "grande",
      uso: "escritorio",
    });
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.categories).toContain("interior");
      expect(p.size).toBe("grande");
      expect(p.uses).toContain("escritorio");
    }
  });

  it("filtra plantas que florescem", () => {
    expect(filterProducts(products, { ...base, flores: true }).every((p) => p.blooms)).toBe(true);
  });

  it("busca sem diferenciar acentos nem maiúsculas", () => {
    expect(filterProducts(products, { ...base, q: "ESTRELICIA" }).map((p) => p.slug)).toEqual([
      "estrelicia",
    ]);
    expect(filterProducts(products, { ...base, q: "costela de adao" }).map((p) => p.slug)).toEqual([
      "costela-de-adao",
    ]);
  });

  it("retorna lista vazia quando nada corresponde", () => {
    expect(filterProducts(products, { ...base, q: "zzzzzz" })).toEqual([]);
  });
});

describe("sortProducts", () => {
  it("ordena por preço e por maior desconto", () => {
    const asc = sortProducts(products, "menor-preco").map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    expect(sortProducts(products, "maior-desconto")[0]?.slug).toBe("agave-dragao");
  });

  it("não altera a lista original", () => {
    const copy = [...products];
    sortProducts(products, "nome");
    expect(products).toEqual(copy);
  });
});

describe("searchProducts", () => {
  it("exige ao menos 2 caracteres", () => {
    expect(searchProducts(products, "a")).toEqual([]);
  });

  it("coloca nomes que começam com o termo primeiro e respeita o limite", () => {
    const result = searchProducts(products, "fi", 3);
    expect(result.length).toBeLessThanOrEqual(3);
    expect(result[0]?.name.toLowerCase().startsWith("fi")).toBe(true);
  });
});
