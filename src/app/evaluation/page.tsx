"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EvaluationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isViolation = true; // Mock data

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
          <span className="text-lg font-semibold text-on-surface">نتيجة التقييم</span>
        </div>
      </header>

      <main className="relative w-full pt-16 bg-background min-h-screen">
        <div className="flex flex-col w-full px-4 pb-8 gap-4" dir="rtl">
          {/* Status Feedback Header */}
          <div className={`relative overflow-hidden rounded-xl p-4 shadow-sm ${
            isViolation ? "bg-error-container" : "bg-primary-fixed"
          }`}>
            <div className="absolute -left-4 -top-4 opacity-10">
              <span className={`material-symbols-outlined text-[120px] ${isViolation ? "text-error" : "text-primary"}`}
                style={{ fontVariationSettings: "'FILL' 1" }}>
                {isViolation ? "warning" : "check_circle"}
              </span>
            </div>
            <div className="relative flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                isViolation ? "bg-error text-on-error" : "bg-primary text-on-primary"
              }`}>
                <span className="material-symbols-outlined text-lg">
                  {isViolation ? "close" : "check"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-semibold ${
                  isViolation ? "text-on-error-container" : "text-on-primary-fixed-variant"
                }`}>
                  {isViolation ? "مخالفة رصدت" : "تم القبول"}
                </span>
                <span className={`text-sm opacity-90 ${
                  isViolation ? "text-on-error-container/80" : "text-on-primary-fixed-variant/80"
                }`}>
                  تنبيه من الذكاء الاصطناعي
                </span>
              </div>
            </div>
          </div>

          {/* Evidence Section */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-on-surface-variant">الصورة الملتقطة</span>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-surface-container-high">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  isViolation ? "bg-error/90 text-on-error" : "bg-primary/90 text-on-primary"
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {isViolation ? "error" : "check_circle"}
                  </span>
                  <span>{isViolation ? "موقع الطفاية فارغ" : "اللافتة مطابقة"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detection Message */}
          <div className="bg-surface-container-low p-4 rounded-xl">
            <p className="text-lg text-on-surface leading-relaxed">
              تم رصد{" "}
              <span className={`font-bold ${isViolation ? "text-error" : "text-primary"}`}>
                {isViolation ? "عدم وجود طفاية حريق" : "التوافق مع الاشتراطات"}
              </span>{" "}
              في الموقع المخصص لها ضمن نطاق المنشأة.
            </p>
          </div>

          {/* Solution Card */}
          {isViolation && (
            <div className="bg-surface-container-highest rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary p-4 flex items-center gap-2 text-on-primary">
                <span className="material-symbols-outlined">lightbulb</span>
                <span className="text-lg font-semibold">الحل المقترح</span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                    ١
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">شراء طفاية حريق</span>
                    <p className="text-base text-on-surface-variant">
                      يجب توفير طفاية بودرة جافة بوزن 6 كجم كحد أدنى.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-outline-variant w-full opacity-30" />
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                    ٢
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">تثبيت الطفاية</span>
                    <p className="text-base text-on-surface-variant">
                      تثبت على الحامل المخصص بارتفاع لا يتجاوز 1.5م من الأرض.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-auto pt-4">
            <button
              onClick={() => router.push("/checklist")}
              className="w-full h-14 bg-primary text-on-primary rounded-xl text-lg font-semibold flex items-center justify-center gap-4 shadow-lg active:scale-[0.98] transition-transform"
            >
              <span>التالي</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={() => router.back()}
              className="w-full h-12 bg-transparent border border-outline text-primary rounded-xl text-sm font-medium flex items-center justify-center gap-4 active:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>إعادة المحاولة</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EvaluationContent />
    </Suspense>
  );
}
