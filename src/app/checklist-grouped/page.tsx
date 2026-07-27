"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import { CircularProgress } from "@/components/shared/circular-progress";

interface Category {
  id: string;
  title: string;
  icon: string;
  colorClass: string;
  iconColorClass: string;
  progress: number;
  items: { label: string; status: "compliant" | "violation" | "pending" }[];
}

const categories: Category[] = [
  {
    id: "attire",
    title: "لبس الموظفين",
    icon: "checkroom",
    colorClass: "bg-primary-fixed",
    iconColorClass: "text-primary",
    progress: 90,
    items: [
      { label: "نظافة الزي الرسمي", status: "compliant" },
      { label: "تغطية الرأس", status: "compliant" },
    ],
  },
  {
    id: "hygiene",
    title: "النظافة العامة",
    icon: "cleaning_services",
    colorClass: "bg-secondary-container",
    iconColorClass: "text-secondary",
    progress: 50,
    items: [
      { label: "نظافة الأرضيات", status: "violation" },
      { label: "تراكم النفايات", status: "compliant" },
    ],
  },
  {
    id: "safety",
    title: "الأمن والسلامة",
    icon: "local_fire_department",
    colorClass: "bg-tertiary-fixed",
    iconColorClass: "text-tertiary",
    progress: 20,
    items: [
      { label: "صلاحية طفايات الحريق", status: "violation" },
      { label: "مخارج الطوارئ", status: "violation" },
    ],
  },
];

export default function ChecklistGroupedPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

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
                <div className="mt-2 inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span className="text-sm">المهلة المتبقية: 14 يوم</span>
                </div>
              </div>
              <div className="relative w-24 h-24">
                <CircularProgress value={72} size={96} strokeWidth={8} />
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-on-surface">الفئات الرقابية</h2>
              <span className="text-sm text-on-surface-variant">{categories.length} فئات</span>
            </div>

            {categories.map((category) => (
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
                        {category.items.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              item.status === "violation"
                                ? "bg-error-container"
                                : "bg-surface"
                            }`}
                          >
                            <span className={`text-base ${
                              item.status === "violation" ? "text-on-error-container" : "text-on-surface"
                            }`}>
                              {item.label}
                            </span>
                            {item.status === "compliant" ? (
                              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                                check_circle
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-error">cancel</span>
                            )}
                          </div>
                        ))}
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
              تحسين فئة &quot;الأمن والسلامة&quot; سيرفع نسبة التزامك الإجمالية إلى 85%.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
