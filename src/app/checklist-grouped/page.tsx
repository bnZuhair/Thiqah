"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import { CircularProgress } from "@/components/shared/circular-progress";
import {
  CHECKLIST_CATEGORIES,
  CHECKLIST_ITEMS,
  STATUS_OVERRIDES,
  getItemsByCategory,
} from "@/lib/checklist-items";

type ItemStatus = "pending" | "compliant" | "violation";

function getStatus(itemId: string): ItemStatus {
  return STATUS_OVERRIDES[itemId]?.status ?? "pending";
}

const categoriesWithProgress = CHECKLIST_CATEGORIES.map((category) => {
  const items = getItemsByCategory(category.id);
  const compliantCount = items.filter((item) => getStatus(item.id) === "compliant").length;
  const progress = items.length ? Math.round((compliantCount / items.length) * 100) : 0;
  return { ...category, items, progress };
});

const overallCompliant = CHECKLIST_ITEMS.filter((item) => getStatus(item.id) === "compliant").length;
const overallProgress = Math.round((overallCompliant / CHECKLIST_ITEMS.length) * 100);

export default function ChecklistGroupedPage() {
  const router = useRouter();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const handleItemClick = (itemId: string) => {
    router.push(`/camera?item=${itemId}`);
  };

  const weakestCategory = [...categoriesWithProgress].sort((a, b) => a.progress - b.progress)[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="الاشتراطات" />

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col w-full gap-8 px-4 pb-8">
          {/* Header Status Card */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(11,93,59,0.05)] p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-on-surface-variant">مطعم البحر</span>
                <h1 className="text-xl font-semibold text-primary">حالة الالتزام</h1>
                <button
                  onClick={() => router.push("/checklist")}
                  className="mt-2 inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">list_alt</span>
                  <span className="text-sm">عرض كقائمة كاملة</span>
                </button>
              </div>
              <div className="relative w-24 h-24">
                <CircularProgress value={overallProgress} size={96} strokeWidth={8} />
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-on-surface">الفئات الرقابية</h2>
              <span className="text-sm text-on-surface-variant">{categoriesWithProgress.length} فئات</span>
            </div>

            {categoriesWithProgress.map((category) => (
              <div
                key={category.id}
                className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 focus:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${category.colorClass} flex items-center justify-center`}>
                      <span className={`material-symbols-outlined ${category.iconColorClass}`}>{category.icon}</span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm text-on-surface">{category.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${category.progress}%`,
                              backgroundColor:
                                category.progress >= 70
                                  ? "var(--primary)"
                                  : category.progress >= 40
                                  ? "var(--secondary)"
                                  : "var(--error)",
                            }}
                          />
                        </div>
                        <span className="text-sm" style={{
                          color: category.progress >= 70
                            ? "var(--primary)"
                            : category.progress >= 40
                            ? "var(--secondary)"
                            : "var(--error)",
                        }}>
                          {category.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                    openCategory === category.id ? "rotate-180" : ""
                  }`}>
                    expand_more
                  </span>
                </button>

                <AnimatePresence>
                  {openCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 flex flex-col gap-2">
                        <div className="h-px bg-surface-variant mb-2" />
                        {category.items.map((item) => {
                          const status = getStatus(item.id);
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleItemClick(item.id)}
                              className={`flex items-center justify-between gap-3 p-3 rounded-lg text-right transition-colors ${
                                status === "violation"
                                  ? "bg-error-container"
                                  : "bg-surface hover:bg-surface-container-low"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`material-symbols-outlined text-[20px] ${
                                  status === "violation" ? "text-on-error-container" : "text-on-surface-variant"
                                }`}>
                                  {item.icon}
                                </span>
                                <span className={`text-base ${
                                  status === "violation" ? "text-on-error-container" : "text-on-surface"
                                }`}>
                                  {item.title}
                                </span>
                              </div>
                              {status === "compliant" && (
                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                  check_circle
                                </span>
                              )}
                              {status === "violation" && (
                                <span className="material-symbols-outlined text-error">cancel</span>
                              )}
                              {status === "pending" && (
                                <span className="material-symbols-outlined text-outline">photo_camera</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Tip card */}
          <div className="mt-4 flex flex-col items-center justify-center p-8 text-center bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-primary-fixed rounded-full">
              <span className="material-symbols-outlined text-primary text-[32px]">tips_and_updates</span>
            </div>
            <p className="text-base text-on-surface mb-2">هل تعلم؟</p>
            <p className="text-sm text-on-surface-variant">
              تحسين فئة &quot;{weakestCategory.title}&quot; سيرفع نسبة التزامك الإجمالية.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
