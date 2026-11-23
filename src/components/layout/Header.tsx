"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaBasketShopping,
  FaHeart,
  FaMagnifyingGlass,
  FaPhone,
  FaUser,
  FaXmark,
} from "react-icons/fa6";
import { Dialog } from "@/components/ui/Dialog";
import { Menu, type MenuItem } from "@/components/ui/Menu";
import { siteConfig } from "@/config/site";
import { buildCatalogHref, PRICE_RANGES, SIZE_OPTIONS } from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { CURRENCIES } from "@/lib/money";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartCount,
  selectIsAuthenticated,
  selectUser,
  selectWishlistIds,
} from "@/store/selectors";
import { logout } from "@/store/slices/authSlice";
import {
  openCart,
  openSearch,
  setCurrency,
  setLocale,
  setMobileNav,
  showLoginPrompt,
  showToast,
} from "@/store/slices/uiSlice";
import type { Currency, Locale } from "@/types";
import styles from "./Header.module.css";

const CURRENCY_LABELS: Record<Currency, string> = {
  BRL: "R$ Reais",
  USD: "$ Dollar",
  EUR: "€ Euro",
};
const LOCALE_LABELS: Record<Locale, string> = { "pt-BR": "🇧🇷 Brasil", "en-US": "🇺🇸 USA" };

export function Header() {
  const t = useT();
  const dispatch = useAppDispatch();
  const { currency, locale, mobileNavOpen } = useAppSelector((s) => s.ui);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistIds).length;
  const user = useAppSelector(selectUser);
  const authenticated = useAppSelector(selectIsAuthenticated);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const currencyItems: MenuItem[] = CURRENCIES.map((c) => ({
    id: c,
    label: CURRENCY_LABELS[c],
    checked: c === currency,
    onSelect: () => dispatch(setCurrency(c)),
  }));
  const localeItems: MenuItem[] = (Object.keys(LOCALE_LABELS) as Locale[]).map((l) => ({
    id: l,
    label: LOCALE_LABELS[l],
    checked: l === locale,
    onSelect: () => dispatch(setLocale(l)),
  }));
  const sizeItems: MenuItem[] = SIZE_OPTIONS.map((o) => ({
    id: o.id,
    label: o.label,
    href: buildCatalogHref({ tamanho: o.id }),
  }));
  const priceItems: MenuItem[] = PRICE_RANGES.map((r) => ({
    id: r.id,
    label: r.label,
    href: buildCatalogHref({ preco: r.id }),
  }));

  const wishlistClick = () => {
    if (!authenticated) dispatch(showLoginPrompt("wishlist"));
  };

  const closeMobile = () => dispatch(setMobileNav(false));

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.top}>
        <div className={`container ${styles.topInner}`}>
          <button
            type="button"
            className={`icon-btn ${styles.menuBtn}`}
            aria-label={t("header.menu")}
            onClick={() => dispatch(setMobileNav(true))}
          >
            <FaBars aria-hidden="true" />
          </button>

          <div className={styles.prefs}>
            <Menu
              align="start"
              label={t("header.currency")}
              trigger={
                <>
                  <strong>{currency === "BRL" ? "R$" : currency === "USD" ? "$" : "€"}</strong>{" "}
                  {t("header.currency")}
                </>
              }
              items={currencyItems}
            />
            <Menu
              align="start"
              label={t("header.language")}
              trigger={
                <>
                  <span aria-hidden="true">{locale === "pt-BR" ? "🇧🇷" : "🇺🇸"}</span>{" "}
                  {t("header.language")}
                </>
              }
              items={localeItems}
            />
            <a
              href={siteConfig.phoneHref}
              className={styles.phone}
              aria-label={`${t("header.phone")}: ${siteConfig.phone}`}
            >
              <FaPhone aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>

          <Link href="/" className={styles.logo} aria-label={siteConfig.name}>
            <Image
              src="/images/brand/logo.webp"
              alt={siteConfig.name}
              width={360}
              height={300}
              priority
              sizes="112px"
            />
          </Link>

          <div className={styles.actions}>
            <button
              type="button"
              className={`icon-btn ${styles.searchBtn}`}
              aria-label={t("header.search")}
              onClick={() => dispatch(openSearch())}
            >
              <FaMagnifyingGlass aria-hidden="true" />
            </button>
            <span className={styles.iconWrap}>
              {authenticated ? (
                <Link
                  href="/favoritos"
                  className="icon-btn"
                  aria-label={`${t("header.wishlist")} (${wishlistCount})`}
                >
                  <FaHeart aria-hidden="true" />
                </Link>
              ) : (
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={t("header.wishlist")}
                  onClick={wishlistClick}
                >
                  <FaHeart aria-hidden="true" />
                </button>
              )}
              {wishlistCount > 0 && (
                <span key={wishlistCount} className={styles.badge} aria-hidden="true">
                  {wishlistCount}
                </span>
              )}
            </span>
            {authenticated && user ? (
              <Menu
                label={t("header.account")}
                trigger={
                  <span className={styles.account}>
                    <FaUser aria-hidden="true" />
                    <span className={styles.accountName}>{user.name.split(" ")[0]}</span>
                  </span>
                }
                items={[
                  { id: "wishlist", label: t("header.wishlist"), href: "/favoritos" },
                  {
                    id: "logout",
                    label: t("header.logout"),
                    onSelect: () => {
                      dispatch(logout());
                      dispatch(showToast({ kind: "info", message: "Você saiu da sua conta." }));
                    },
                  },
                ]}
              />
            ) : (
              <Link href="/login" className={styles.account}>
                <FaUser aria-hidden="true" />
                <span className={styles.accountName}>{t("header.login")}</span>
              </Link>
            )}
            <span className={styles.iconWrap}>
              <button
                type="button"
                className="icon-btn"
                aria-label={`${t("header.cart")} (${cartCount})`}
                data-cart-target
                onClick={() => dispatch(openCart())}
              >
                <FaBasketShopping aria-hidden="true" />
              </button>
              {cartCount > 0 && (
                <span key={cartCount} className={styles.badge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <nav className={`container ${styles.nav}`} aria-label={t("nav.main")}>
        <Menu label={t("nav.sizes")} trigger={t("nav.sizes")} items={sizeItems} />
        <Menu label={t("nav.prices")} trigger={t("nav.prices")} items={priceItems} />
        <Link className={styles.navLink} href={buildCatalogHref({ categoria: "decorativas" })}>
          {t("nav.decor")}
        </Link>
        <Link className={styles.navLink} href={buildCatalogHref({ flores: true })}>
          {t("nav.flowers")}
        </Link>
        <Link className={styles.navLink} href={buildCatalogHref({ categoria: "mudas" })}>
          {t("nav.pots")}
        </Link>
      </nav>

      <Dialog open={mobileNavOpen} onClose={closeMobile} label={t("nav.main")} variant="drawerLeft">
        <div className={styles.mobile}>
          <div className={styles.mobileHead}>
            <Image src="/images/brand/logo.webp" alt={siteConfig.name} width={360} height={300} />
            <button
              type="button"
              className="icon-btn"
              aria-label={t("common.close")}
              onClick={closeMobile}
              data-autofocus
            >
              <FaXmark aria-hidden="true" />
            </button>
          </div>
          <div className={styles.mobileBody}>
            <button
              type="button"
              className={styles.mobileLink}
              onClick={() => {
                closeMobile();
                dispatch(openSearch());
              }}
            >
              {t("header.search")}
            </button>
            <p className={styles.mobileGroup}>{t("nav.sizes")}</p>
            {sizeItems.map((i) => (
              <Link key={i.id} href={i.href!} className={styles.mobileLink} onClick={closeMobile}>
                {i.label}
              </Link>
            ))}
            <p className={styles.mobileGroup}>{t("nav.prices")}</p>
            {priceItems.map((i) => (
              <Link key={i.id} href={i.href!} className={styles.mobileLink} onClick={closeMobile}>
                {i.label}
              </Link>
            ))}
            <p className={styles.mobileGroup}>{t("nav.main")}</p>
            <Link
              className={styles.mobileLink}
              href={buildCatalogHref({ categoria: "decorativas" })}
              onClick={closeMobile}
            >
              {t("nav.decor")}
            </Link>
            <Link
              className={styles.mobileLink}
              href={buildCatalogHref({ flores: true })}
              onClick={closeMobile}
            >
              {t("nav.flowers")}
            </Link>
            <Link
              className={styles.mobileLink}
              href={buildCatalogHref({ categoria: "mudas" })}
              onClick={closeMobile}
            >
              {t("nav.pots")}
            </Link>
            <p className={styles.mobileGroup}>{t("header.currency")}</p>
            {currencyItems.map((i) => (
              <button
                key={i.id}
                type="button"
                role="menuitemradio"
                aria-checked={i.checked}
                className={styles.mobileLink}
                onClick={i.onSelect}
              >
                {i.label}
              </button>
            ))}
            <p className={styles.mobileGroup}>{t("header.language")}</p>
            {localeItems.map((i) => (
              <button
                key={i.id}
                type="button"
                role="menuitemradio"
                aria-checked={i.checked}
                className={styles.mobileLink}
                onClick={i.onSelect}
              >
                {i.label}
              </button>
            ))}
            <a className={styles.mobileLink} href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
