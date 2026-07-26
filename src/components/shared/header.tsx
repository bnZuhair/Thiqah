import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">My Starter</span>
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
