"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Dialog } from "@/components/ui/Dialog";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { getProductById } from "@/data/products";
import { usePrice } from "@/hooks/usePrice";
import { useT } from "@/lib/i18n";
import { installmentValue } from "@/lib/money";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { closeQuickView, openCart } from "@/store/slices/uiSlice";
import { QuantitySelector } from "./QuantitySelector";
import styles from "./QuickView.module.css";
import { useProductActions } from "./useProductActions";
import type { Product } from "@/types";

function QuickViewContent({ product }: { product: Product }) {
  const t = useT();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const format = usePrice();
  const imageWrap = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useProductActions(product);

  const buyNow = () => {
    dispatch(addItem({ productId: product.id, quantity }));
    dispatch(closeQuickView());
    router.push("/checkout");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.media} ref={imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 720px) 90vw, 320px"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.sci}>{product.scientificName}</p>
          </div>
          <button
            type="button"
            className={`icon-btn ${styles.close}`}
            aria-label={t("common.close")}
            onClick={() => dispatch(closeQuickView())}
            data-autofocus
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>
        <div className={styles.meta}>
          <span>{t("product.ref", { sku: product.sku })}</span>
          <Stars rating={product.rating} />
        </div>
        <div className={styles.prices}>
          <p>
            <Price
              cents={product.price}
              compareAt={product.compareAtPrice}
              className={styles.price}
              oldClassName={styles.old}
            />
          </p>
          <p className={styles.installments}>
            {t("product.installments", { value: format(installmentValue(product.price)) })}
          </p>
        </div>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.buy}>
          <QuantitySelector value={quantity} onChange={setQuantity} label={t("product.quantity")} />
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              addToCart(quantity, imageWrap.current?.querySelector("img"));
              dispatch(closeQuickView());
              dispatch(openCart());
            }}
          >
            {t("product.add")}
          </button>
          <button type="button" className="btn btn-primary" onClick={buyNow}>
            {t("product.buyNow")}
          </button>
        </div>
        <Link
          href={`/produto/${product.slug}`}
          className={styles.details}
          onClick={() => dispatch(closeQuickView())}
        >
          {t("common.seeDetails")}
        </Link>
      </div>
    </div>
  );
}

/** Visualização rápida aberta pelo ícone de olho dos cards. */
export function QuickView() {
  const dispatch = useAppDispatch();
  const productId = useAppSelector((state) => state.ui.quickViewProductId);
  const current = productId ? getProductById(productId) : undefined;
  // Guarda o último produto para o conteúdo não sumir durante a animação de saída.
  const [shown, setShown] = useState<Product | undefined>(current);
  if (current && current !== shown) setShown(current);
  const t = useT();

  return (
    <Dialog
      open={Boolean(current)}
      onClose={() => dispatch(closeQuickView())}
      label={t("product.quickView")}
      width={860}
    >
      {/* A chave reinicia a quantidade ao abrir outro produto. */}
      {shown ? <QuickViewContent key={shown.id} product={shown} /> : null}
    </Dialog>
  );
}
