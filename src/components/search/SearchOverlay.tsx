"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useMemo, useState, type FormEvent } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Dialog } from "@/components/ui/Dialog";
import { products } from "@/data/products";
import { usePrice } from "@/hooks/usePrice";
import { buildCatalogHref, searchProducts } from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSearch } from "@/store/slices/uiSlice";
import styles from "./SearchOverlay.module.css";

const SUGGESTIONS = [
  { label: "Para escritório", href: buildCatalogHref({ uso: "escritorio" }) },
  { label: "Fáceis de cuidar", href: buildCatalogHref({ uso: "facil" }) },
  { label: "Seguras para pets", q: "pets" },
  { label: "Suculentas", q: "suculenta" },
  { label: "Plantas tropicais", href: buildCatalogHref({ categoria: "tropicais" }) },
] as const;

function SearchContent() {
  const t = useT();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const format = usePrice();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => searchProducts(products, deferred), [deferred]);
  const close = () => dispatch(closeSearch());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    close();
    router.push(buildCatalogHref({ q: query.trim() }));
  };

  return (
    <div className={styles.box}>
      <form className={styles.form} role="search" onSubmit={submit}>
        <FaMagnifyingGlass aria-hidden="true" />
        <input
          className="input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          aria-label={t("search.label")}
          autoComplete="off"
          data-autofocus
        />
      </form>

      {query.trim().length < 2 ? (
        <div>
          <p className={styles.hint}>{t("search.suggestions")}</p>
          <div className={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <Link
                key={s.label}
                href={"href" in s ? s.href : buildCatalogHref({ q: s.q })}
                className={styles.chip}
                onClick={close}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className={styles.empty} role="status">
          {t("search.empty", { query: query.trim() })}
        </p>
      ) : (
        <>
          <ul role="list" className={styles.results} aria-label={t("search.label")}>
            {results.map((p, i) => (
              <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={`/produto/${p.slug}`}
                  className={styles.result}
                  onClick={close}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className={styles.thumb}>
                    <Image src={p.image} alt="" fill sizes="56px" />
                  </span>
                  <span>
                    <span className={styles.name}>{p.name}</span>
                    <br />
                    <span className={styles.sci}>{p.scientificName}</span>
                  </span>
                  <span className={styles.price}>{format(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={buildCatalogHref({ q: query.trim() })} className={styles.all} onClick={close}>
            {t("search.seeAll")}
          </Link>
        </>
      )}
    </div>
  );
}

export function SearchOverlay() {
  const t = useT();
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.searchOpen);
  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeSearch())}
      label={t("search.label")}
      variant="top"
    >
      {/* Montar só quando aberto zera o texto digitado a cada abertura. */}
      <SearchContent />
    </Dialog>
  );
}
