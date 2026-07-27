"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    title: "مرحباً بك في ثقة",
    description: "منصتك الموحدة لضمان التزام منشأتك بالاشتراطات الحكومية بكل سهولة.",
    icon: "verified",
    showLogo: true,
  },
  {
    id: 2,
    title: "فحص ذكي وسريع",
    description: "استخدم كاميرا جوالك للتحقق من المتطلبات والحصول على تقييم فوري.",
    icon: "document_scanner",
    showLogo: false,
  },
  {
    id: 3,
    title: "التزامك سر نجاحك",
    description: "احصل على تقارير تفصيلية ومهلة تصحيحية لضمان سلامة أعمالك.",
    icon: "schedule",
    showLogo: false,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <main className="relative w-full h-screen bg-background flex flex-col overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Skip button */}
      <div className="flex justify-start px-4 pt-6 z-10 shrink-0">
        <button
          onClick={() => { window.location.href = "/home"; }}
          className="text-sm text-primary px-4 py-2 hover:bg-primary/5 transition-colors rounded-full active:scale-95"
        >
          تخطي
        </button>
      </div>

      {/* Carousel */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row-reverse h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-none w-full h-full flex flex-col items-center justify-center px-4"
            >
              {/* Logo / Icon */}
              <div className="relative mb-8">
                {slide.showLogo ? (
                  <div className="relative bg-surface-container-lowest p-6 rounded-3xl shadow-xl shadow-primary/5">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: "80px", fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "80px", fontVariationSettings: "'FILL' 1" }}
                    >
                      {slide.icon}
                    </span>
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="text-center max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-on-surface">
                  {slide.title}
                </h1>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-4 pb-[max(3rem,env(safe-area-inset-bottom))] space-y-6 z-10 shrink-0">
        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-outline-variant"
              }`}
            />
          ))}
        </div>

        {/* Action buttons */}
        {selectedIndex === slides.length - 1 ? (
          <button
            onClick={() => { window.location.href = "/home"; }}
            className="w-full bg-primary text-on-primary py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>ابدأ الآن</span>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={scrollNext}
            className="w-full bg-primary text-on-primary py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>التالي</span>
            <span className="material-symbols-outlined transform rotate-180">
              arrow_forward
            </span>
          </button>
        )}
      </div>
    </main>
  );
}
