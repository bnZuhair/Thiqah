"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", icon: "home", label: "الرئيسية" },
  { href: "/checklist", icon: "assignment_turned_in", label: "الاشتراطات" },
  { href: "/audit", icon: "description", label: "التقارير" },
  { href: "/notifications", icon: "notifications", label: "الإشعارات" },
  { href: "/profile", icon: "person", label: "الحساب" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface/80 backdrop-blur-xl pb-safe shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex justify-between items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
