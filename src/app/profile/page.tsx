"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import { CircularProgress } from "@/components/shared/circular-progress";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="الحساب" />

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col w-full gap-8 px-4">
          {/* Header & Establishment Identity */}
          <section className="relative flex flex-col items-center pt-8 pb-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[48px]">storefront</span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-1 text-center">مطعم البحر</h1>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
              <span className="material-symbols-outlined text-primary text-[18px]">restaurant</span>
              <span className="text-sm font-medium text-primary">نشاط: مطاعم</span>
            </div>
          </section>

          {/* Trust Score Section */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_rgba(11,93,59,0.05)] border-r-4 border-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface-variant">مؤشر الثقة والامتثال</span>
                <span className="text-lg font-semibold text-on-surface">درجة المنشأة</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF9800] to-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
            </div>
            <div className="relative flex flex-col items-center py-4">
              <div className="relative w-40 h-40">
                <CircularProgress value={72} size={160} strokeWidth={8} showValue={false} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-primary leading-none">720</span>
                  <span className="text-xs text-on-surface-variant">من 1000</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="text-sm">أعلى بنسبة 12% عن الشهر السابق</span>
              </div>
            </div>
          </section>

          {/* Establishment Details */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-on-surface">بيانات السجل والترخيص</h2>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(11,93,59,0.05)]">
              {/* Commercial Registration */}
              <div className="p-4 flex items-center justify-between border-b border-surface-variant/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">subtitles</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface-variant">رقم السجل التجاري</span>
                    <span className="text-base text-on-surface">1010445566</span>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">content_copy</span>
                </button>
              </div>

              {/* Address */}
              <div className="p-4 flex items-center gap-4 border-b border-surface-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-on-surface-variant">العنوان الوطني</span>
                  <span className="text-base text-on-surface">7433 طريق الملك فهد، حي الصحافة، الرياض</span>
                </div>
              </div>

              {/* License Expiry */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-error-container/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-error">calendar_today</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface-variant">تاريخ انتهاء الرخصة</span>
                    <span className="text-base text-on-surface">1446/05/20 هـ</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-error-container text-on-error-container text-sm rounded">قرب الانتهاء</span>
              </div>
            </div>
          </section>

          {/* Map Preview */}
          <section className="flex flex-col gap-2 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">موقع المنشأة</span>
              <button className="text-sm text-primary font-medium">فتح في الخرائط</button>
            </div>
            <div className="w-full h-40 bg-surface-container-high rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-primary text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-12">
            <button className="w-full h-12 bg-primary text-on-primary rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined text-[20px]">edit</span>
              تحديث البيانات
            </button>
            <button className="w-full h-12 bg-transparent text-primary rounded-xl text-sm font-medium flex items-center justify-center gap-2 active:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              تحميل شهادة الامتثال
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
