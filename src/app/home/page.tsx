"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";

const features = [
  {
    icon: "explore",
    title: "الإرشاد والتأسيس",
    description: "خطوات واضحة تبدأ معك من الصفر لتأسيس نشاطك بما يتوافق مع الأنظمة.",
    colorClass: "bg-primary-container text-on-primary-container",
  },
  {
    icon: "history_toggle_off",
    title: "الفحص والمهلة",
    description: "جدولة فحوصاتك الدورية مع نظام تنبيه ذكي للمهلات التصحيحية.",
    colorClass: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    icon: "menu_book",
    title: "قاعدة معرفة الاشتراطات",
    description: "مرجع شامل ومحدث لجميع اللوائح والاشتراطات الحكومية في مكان واحد.",
    colorClass: "bg-secondary-container text-on-secondary-container",
  },
];

export default function HomeGuestPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<"new" | "existing" | null>(null);

  const handleStart = () => {
    setShowModal(true);
  };

  const handleNext = () => {
    if (selectedType === "new") {
      router.push("/select-activity");
    } else if (selectedType === "existing") {
      router.push("/checklist-grouped");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="relative px-4 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle className="text-primary" cx="350" cy="50" fill="currentColor" r="150" />
            <circle className="text-primary-container" cx="50" cy="350" fill="currentColor" r="100" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center gap-4 pt-4">
          <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest shadow-xl p-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-primary">ثقة: رفيقك للالتزام الحكومي</h1>
            <p className="text-base text-on-surface-variant max-w-[280px] mx-auto">
              نمكن المنشآت من تحقيق أعلى معايير الامتثال بكل سهولة وشفافية.
            </p>
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="px-4 mb-8">
        <div className="relative w-full aspect-[16/10] bg-surface-container-high rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-sm font-medium text-primary">منشأة معتمدة وممتثلة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 flex flex-col gap-4 pb-32">
        <h2 className="text-lg font-semibold text-on-surface mb-2">مميزات المنصة</h2>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl active:scale-[0.98] transition-transform"
          >
            <div className={`w-12 h-12 shrink-0 rounded-lg ${feature.colorClass} flex items-center justify-center shadow-sm`}>
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
              <p className="text-base text-on-surface-variant">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-20 left-0 w-full px-4 z-40 pointer-events-none">
        <div className="max-w-md mx-auto w-full pointer-events-auto">
          <button
            onClick={handleStart}
            className="w-full h-14 bg-primary text-on-primary text-lg font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span>ابدأ الآن</span>
            <span className="material-symbols-outlined group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Modal Overlay */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-[70] flex items-end justify-center p-4">
            <div className="w-full max-w-md bg-surface rounded-t-[2rem] rounded-b-xl shadow-xl overflow-hidden">
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
              </div>
              <div className="px-4 pb-8 pt-4 flex flex-col gap-6">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-on-surface">هل تنوي فتح منشأة جديدة؟</h2>
                  <p className="text-base text-on-surface-variant">اختر نوع الإجراء للبدء في رحلة الامتثال</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setSelectedType("new")}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                      selectedType === "new"
                        ? "bg-primary-container/10 shadow-[0_0_0_2px_inset] shadow-primary"
                        : "bg-surface-container-low"
                    }`}
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed">
                      <span className="material-symbols-outlined text-[32px]">add_business</span>
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-lg font-semibold text-on-surface">منشأة جديدة</h3>
                      <p className="text-sm text-on-surface-variant">تأسيس وترخيص منشأة لأول مرة</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedType === "new"
                        ? "bg-primary border-primary"
                        : "border-outline-variant"
                    }`}>
                      {selectedType === "new" && (
                        <span className="material-symbols-outlined text-[16px] text-on-primary">check</span>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedType("existing")}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                      selectedType === "existing"
                        ? "bg-primary-container/10 shadow-[0_0_0_2px_inset] shadow-primary"
                        : "bg-surface-container-low"
                    }`}
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                      <span className="material-symbols-outlined text-[32px]">storefront</span>
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-lg font-semibold text-on-surface">لدي منشأة بالفعل</h3>
                      <p className="text-sm text-on-surface-variant">إدارة وتحديث بيانات منشأة قائمة</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedType === "existing"
                        ? "bg-primary border-primary"
                        : "border-outline-variant"
                    }`}>
                      {selectedType === "existing" && (
                        <span className="material-symbols-outlined text-[16px] text-on-primary">check</span>
                      )}
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedType}
                  className="w-full h-14 bg-primary text-on-primary text-lg font-semibold rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>التالي</span>
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
