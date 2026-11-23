import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Image src="/images/brand/logo.webp" alt="Jardim Exótico" width={180} height={150} priority />
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.text}>
        O endereço pode ter mudado ou a planta já foi para um novo lar. Volte ao início ou veja o
        catálogo.
      </p>
      <div className={styles.actions}>
        <Link href="/" className="btn btn-primary">
          Ir para o início
        </Link>
        <Link href="/produtos" className="btn btn-outline">
          Ver todas as plantas
        </Link>
      </div>
    </main>
  );
}
