"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import { ProgressBar } from "@/components/shared/progress-bar";
import { CHECKLIST_ITEMS, STATUS_OVERRIDES } from "@/lib/checklist-items";
import { getInitialOwnerData, getSelectedBusinessId, type Business, type Owner } from "@/lib/mock-data";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: "pending" | "compliant" | "violation";
  statusText?: string;
}

export default function ChecklistPage() {
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const data = getInitialOwnerData();
    setOwner(data);
    const selectedId = getSelectedBusinessId(data.businesses[0]?.id);
    const currentBusiness = data.businesses.find((business) => business.id === selectedId) ?? data.businesses[0];
    setSelectedBusiness(currentBusiness ?? null);
  }, []);

  const items = useMemo(
    () =>
      CHECKLIST_ITEMS.map((item) => {
        const status = selectedBusiness?.checklistStatuses?.[item.id] ?? STATUS_OVERRIDES[item.id]?.status ?? "pending";
        return {
          ...item,
          status,
          statusText: STATUS_OVERRIDES[item.id]?.statusText,
        };
      }),
    [selectedBusiness]
  );

  const progressCount = items.filter((i) => i.status === "compliant").length;

  const handleCapture = (id: string) => {
    router.push(`/camera?item=${id}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="الاشتراطات" />

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col w-full px-4 gap-8">
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface-variant">المتجر: {selectedBusiness?.name ?? "المنشأة"}</span>
                <h1 className="text-2xl font-bold text-primary">قائمة الاشتراطات</h1>
              </div>
              <button
                onClick={() => router.push("/checklist-grouped")}
                className="flex items-center gap-1 bg-primary-container/20 px-3 py-1 rounded-full active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-primary text-[16px]">category</span>
                <span className="text-sm text-primary">عرض مجمّع</span>
              </button>
            </div>

            <ProgressBar
              current={progressCount}
              total={items.length}
              label={`تبقت ${items.length - progressCount} خطوة لإتمام عملية التدقيق بنجاح`}
            />
          </div>

          <div className="rounded-[20px] border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-on-surface-variant">المخالفات الحالية</p>
                <p className="text-base font-semibold text-on-surface">{selectedBusiness?.name ?? "المنشأة"}</p>
              </div>
              <span className="rounded-full bg-error/10 px-3 py-1 text-sm font-medium text-error">
                {selectedBusiness?.violations.length ?? 0} مخالفة
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {selectedBusiness?.violations.map((violation) => (
                <div key={violation.id} className="rounded-xl bg-surface-container p-3">
                  <p className="text-sm font-semibold text-on-surface">{violation.title}</p>
                  <p className="mt-1 text-sm text-on-surface-variant">{violation.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-surface-container-lowest p-4 rounded-xl shadow-md flex flex-col gap-4 relative overflow-hidden ${
                  item.status === "pending" ? "opacity-80" : ""
                }`}
              >
                <div className={`absolute right-0 top-0 w-1 h-full ${
                  item.status === "compliant"
                    ? "bg-primary"
                    : item.status === "violation"
                    ? "bg-error"
                    : "bg-outline-variant"
                }`} />

                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.status === "compliant"
                        ? "bg-primary/10"
                        : item.status === "violation"
                        ? "bg-error-container/30"
                        : "bg-surface-container-high"
                    }`}>
                      <span
                        className={`material-symbols-outlined ${
                          item.status === "compliant"
                            ? "text-primary"
                            : item.status === "violation"
                            ? "text-error"
                            : "text-outline"
                        }`}
                        style={item.status === "compliant" ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-on-surface">{item.title}</h3>
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === "compliant"
                            ? "bg-primary animate-pulse"
                            : item.status === "violation"
                            ? "bg-error"
                            : "bg-outline"
                        }`} />
                      </div>
                      {item.status === "compliant" && (
                        <p className="text-base text-primary font-medium">{item.statusText}</p>
                      )}
                      {item.status === "violation" && item.statusText && (
                        <div className="flex items-center gap-1 mt-1 text-error">
                          <span className="material-symbols-outlined text-[16px]">warning</span>
                          <p className="text-sm">{item.statusText}</p>
                        </div>
                      )}
                      {item.status === "pending" && (
                        <p className="text-base text-on-surface-variant">لم يتم التدقيق بعد</p>
                      )}
                    </div>
                  </div>
                  {item.status === "compliant" && (
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  )}
                </div>

                {item.status === "pending" && (
                  <button
                    onClick={() => handleCapture(item.id)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-on-primary rounded-lg text-sm active:scale-[0.98] transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                    <span>التقاط صورة للتحقق</span>
                  </button>
                )}
                {item.status === "compliant" && (
                  <button className="flex items-center justify-center gap-2 w-full py-3 bg-surface-container text-on-surface-variant rounded-lg text-sm">
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                    <span>تحديث الصورة</span>
                  </button>
                )}
                {item.status === "violation" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCapture(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-error text-on-error rounded-lg text-sm active:scale-[0.98] transition-transform"
                    >
                      <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                      <span>إعادة التصوير</span>
                    </button>
                    <button className="px-4 py-3 bg-surface-container text-on-surface-variant rounded-lg">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {!showHint && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 1.5 }}
            className="fixed bottom-24 left-4 right-4 bg-primary text-on-primary p-4 rounded-2xl shadow-xl flex items-center gap-3 z-40"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">تلميح ذكي</p>
              <p className="text-xs opacity-90">
                تأكد من وضوح الإضاءة عند تصوير لافتة المحل لتجنب الرفض الآلي.
              </p>
            </div>
            <button onClick={() => setShowHint(true)} className="text-on-primary/60">
              <span className="material-symbols-outlined">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
