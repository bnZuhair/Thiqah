"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CircularProgress } from "@/components/shared/circular-progress";
import { BottomNav } from "@/components/shared/bottom-nav";
import { getInitialOwnerData, getSelectedBusinessId, type Business, type Owner } from "@/lib/mock-data";

export default function AuditPage() {
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const data = getInitialOwnerData();
    setOwner(data);
    const selectedId = getSelectedBusinessId(data.businesses[0]?.id);
    const currentBusiness = data.businesses.find((business) => business.id === selectedId) ?? data.businesses[0];
    setSelectedBusiness(currentBusiness ?? null);
  }, []);

  const violations = useMemo(() => {
    return (selectedBusiness?.violations ?? []).map((violation, index) => ({
      id: violation.id,
      title: violation.title,
      severity: violation.severity,
      severityColor:
        violation.severity === "عالية"
          ? "bg-error text-white"
          : violation.severity === "متوسطة"
            ? "bg-tertiary-container text-on-tertiary-fixed-variant"
            : "bg-primary/10 text-primary",
      borderColor:
        violation.severity === "عالية"
          ? "bg-error"
          : violation.severity === "متوسطة"
            ? "bg-tertiary-container"
            : "bg-primary",
      date: index === 0 ? "اليوم" : index === 1 ? "غداً" : "أولويات لاحقة",
      description: violation.description,
    }));
  }, [selectedBusiness]);

  const complianceScore = selectedBusiness?.complianceScore ?? 75;
  const compliantCount = Math.max(0, 12 - violations.length);
  const reviewCount = violations.length > 0 ? 1 : 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
          </button>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-on-surface">ملخص التدقيق</span>
            <span className="text-sm text-on-surface-variant">{selectedBusiness?.name ?? owner?.name ?? "المنشأة"}</span>
          </div>
        </div>
      </header>

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col w-full gap-8 p-4">
          <section className="relative overflow-hidden rounded-xl bg-primary-container p-6 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                <defs>
                  <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <CircularProgress value={complianceScore} size={160} strokeWidth={12} />
              </div>
              <div className="mt-4 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full">
                <span className="text-sm text-on-primary">{complianceScore >= 80 ? "حالة جيدة" : "يحتاج تحسين"}</span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <span className="text-lg font-semibold text-on-surface">{compliantCount}</span>
              <span className="text-xs text-on-surface-variant">مطابق</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <span className="text-lg font-semibold text-on-surface">{violations.length}</span>
              <span className="text-xs text-on-surface-variant">مخالف</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
              </div>
              <span className="text-lg font-semibold text-on-surface">{reviewCount}</span>
              <span className="text-xs text-on-surface-variant">مراجعة</span>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-semibold text-on-surface">تفاصيل المخالفات</h2>
              <span className="text-sm text-primary">{selectedBusiness?.name ?? "المنشأة"}</span>
            </div>

            {violations.map((violation, index) => (
              <motion.div
                key={violation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-3 relative overflow-hidden"
              >
                <div className={`absolute right-0 top-0 bottom-0 w-1 ${violation.borderColor}`} />
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm px-2 py-0.5 rounded-full w-fit ${violation.severityColor}`}>
                      {violation.severity}
                    </span>
                    <h3 className="text-base font-semibold text-on-surface">{violation.title}</h3>
                  </div>
                  <span className="text-sm text-on-surface-variant">{violation.date}</span>
                </div>
                <p className="text-base text-on-surface-variant">{violation.description}</p>
                {violation.severity === "عالية" && (
                  <div className="flex gap-2">
                    <button className="bg-surface-container-high text-on-surface text-sm px-3 py-2 rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      تعديل الحالة
                    </button>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="mt-4 p-6 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center opacity-60">
              <p className="text-sm text-on-surface-variant">
                لا توجد مخالفات إضافية تحتاج إجراءً فورياً
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3 mt-auto">
            <button className="w-full bg-primary text-on-primary h-14 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              تحميل التقرير (PDF)
            </button>
            <button className="w-full bg-surface-container-high text-primary h-14 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined">share</span>
              مشاركة مع الفريق
            </button>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
