import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Recuperar senha", robots: { index: false } };

export default function RecoverPage() {
  return <AuthForm mode="recover" />;
}
