import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <Logo className="mx-auto mb-10 h-10" />
        <p className="font-display text-7xl text-lime">404</p>
        <p className="lead mt-4">Такой страницы нет. Возможно, она переехала.</p>
        <Link href="/" className="btn btn-primary mt-8">На главную</Link>
      </div>
    </main>
  );
}
