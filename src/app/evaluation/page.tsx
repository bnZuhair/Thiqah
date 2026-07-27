"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ComplianceAnalysis } from "@/lib/ai/schemas";

interface StoredEvaluation {
  image: string;
  analysis: ComplianceAnalysis;
  capturedAt: number;
}

const STATUS_CONFIG = {
  compliant: {
    label: "تم القبول",
    subLabel: "تنبيه من الذكاء الاصطناعي",
    bannerBg: "bg-primary-fixed",
    iconColor: "text-primary",
    badgeBg: "bg-primary",
    badgeText: "text-on-primary",
    textColor: "text-on-primary-fixed-variant",
    icon: "check_circle",
    badgeIcon: "check",
  },
  "non-compliant": {
    label: "مخالفة رصدت",
    subLabel: "تنبيه من الذكاء الاصطناعي",
    bannerBg: "bg-error-container",
    iconColor: "text-error",
    badgeBg: "bg-error",
    badgeText: "text-on-error",
    textColor: "text-on-error-container",
    icon: "warning",
    badgeIcon: "close",
  },
  partial: {
    label: "التزام جزئي",
    subLabel: "تنبيه من الذكاء الاصطناعي",
    bannerBg: "bg-secondary-container",
    iconColor: "text-secondary",
    badgeBg: "bg-secondary",
    badgeText: "text-on-secondary",
    textColor: "text-on-secondary-container",
    icon: "info",
    badgeIcon: "priority_high",
  },
} as const;

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumeral(n: number) {
  return String(n)
    .split("")
    .map((d) => ARABIC_DIGITS[Number(d)] ?? d)
    .join("");
}

function EvaluationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item") || "1";

  const [data, setData] = useState<StoredEvaluation | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(`evaluation:${itemId}`);
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        setData(null);
      }
    }
    setLoaded(true);
  }, [itemId]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
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
        <main className="relative w-full pt-16 min-h-screen flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-[56px]">image_search</span>
          <p className="text-lg font-semibold text-on-surface">لا توجد نتيجة تقييم بعد</p>
          <p className="text-sm text-on-surface-variant">يرجى التقاط صورة أولاً للحصول على تحليل الذكاء الاصطناعي.</p>
          <button
            onClick={() => router.push(`/camera?item=${itemId}`)}
            className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-medium active:scale-95 transition-transform"
          >
            التقاط صورة
          </button>
        </main>
      </div>
    );
  }

  const { analysis, image } = data;
  const config = STATUS_CONFIG[analysis.complianceStatus];
  const hasViolations = analysis.violations.length > 0;
  const hasRecommendations = analysis.recommendations.length > 0;

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
          <div className={`relative overflow-hidden rounded-xl p-4 shadow-sm ${config.bannerBg}`}>
            <div className="absolute -left-4 -top-4 opacity-10">
              <span
                className={`material-symbols-outlined text-[120px] ${config.iconColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {config.icon}
              </span>
            </div>
            <div className="relative flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${config.badgeBg} ${config.badgeText}`}>
                <span className="material-symbols-outlined text-lg">{config.badgeIcon}</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-semibold ${config.textColor}`}>{config.label}</span>
                <span className={`text-sm opacity-90 ${config.textColor}`}>{config.subLabel}</span>
              </div>
            </div>
          </div>

          {/* Evidence Section */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-on-surface-variant">الصورة الملتقطة</span>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-surface-container-high">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="الصورة الملتقطة" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${config.badgeBg}/90 ${config.badgeText}`}>
                  <span className="material-symbols-outlined text-[18px]">{config.icon}</span>
                  <span>{config.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detection Message */}
          <div className="bg-surface-container-low p-4 rounded-xl">
            <p className="text-base text-on-surface leading-relaxed whitespace-pre-line">{analysis.analysis}</p>
          </div>

          {/* Violations */}
          {hasViolations && (
            <div className="bg-error-container/40 rounded-xl p-4 flex flex-col gap-3">
              <span className="text-sm font-semibold text-on-error-container">المخالفات / النواقص</span>
              <div className="flex flex-col gap-2">
                {analysis.violations.map((violation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5">error</span>
                    <p className="text-sm text-on-error-container">{violation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solution Card */}
          {hasRecommendations && (
            <div className="bg-surface-container-highest rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary p-4 flex items-center gap-2 text-on-primary">
                <span className="material-symbols-outlined">lightbulb</span>
                <span className="text-lg font-semibold">الحل المقترح</span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                        {toArabicNumeral(index + 1)}
                      </div>
                      <p className="text-base text-on-surface-variant pt-1">{recommendation}</p>
                    </div>
                    {index < analysis.recommendations.length - 1 && (
                      <div className="h-px bg-outline-variant w-full opacity-30" />
                    )}
                  </div>
                ))}
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
              onClick={() => router.push(`/camera?item=${itemId}`)}
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
