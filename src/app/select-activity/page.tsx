"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const activities = [
  { id: "restaurants", label: "مطاعم", icon: "restaurant", available: true },
  { id: "salons", label: "صالونات", icon: "content_cut", available: false },
  { id: "clinics", label: "عيادات", icon: "medical_services", available: false },
  { id: "retail", label: "محلات تجزئة", icon: "storefront", available: false },
  { id: "cafes", label: "مقاهي", icon: "local_cafe", available: false },
  { id: "hotels", label: "فنادق", icon: "apartment", available: false },
];

export default function BusinessSelectionPage() {
  const router = useRouter();

  const handleSelect = (activity: typeof activities[0]) => {
    if (!activity.available) return;
    router.push("/checklist");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
          </button>
          <span className="text-lg font-semibold text-on-surface">اختر نشاط المنشأة</span>
        </div>
      </header>

      {/* Content */}
      <main className="relative w-full pt-16 bg-background min-h-screen">
        <div className="relative z-10 px-4 flex flex-col gap-8 pb-10">
          {/* Hero Section */}
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-2xl font-bold text-on-surface">اختر نشاط المنشأة</h1>
            <p className="text-base text-on-surface-variant">
              حدد نوع النشاط التجاري الذي ترغب في مراجعته أو إصدار التراخيص له.
            </p>
          </div>

          {/* Activity Grid */}
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {activity.available ? (
                  <button
                    onClick={() => handleSelect(activity)}
                    className="group relative flex flex-col items-center justify-center p-6 bg-surface-container-highest rounded-xl shadow-md transition-all active:scale-95 w-full"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-inner">
                      <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {activity.icon}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-on-surface">{activity.label}</span>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm text-primary">متاح الآن</span>
                    </div>
                  </button>
                ) : (
                  <div className="relative flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl opacity-80 grayscale-[0.5]">
                    <div className="absolute top-3 left-3 bg-secondary-container px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-on-secondary-container">lock</span>
                      <span className="text-sm text-on-secondary-container">قريباً</span>
                    </div>
                    <div className="w-16 h-16 mb-4 rounded-full bg-surface-variant flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[32px]">{activity.icon}</span>
                    </div>
                    <span className="text-lg font-semibold text-outline">{activity.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Info hint */}
          <div className="mt-4 p-6 bg-primary-fixed-dim/10 rounded-2xl flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">info</span>
            </div>
            <p className="text-sm text-on-primary-fixed-variant">
              هل تبحث عن نشاط آخر؟ نحن نعمل باستمرار على إضافة قطاعات جديدة لتغطية كافة احتياجاتكم.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
