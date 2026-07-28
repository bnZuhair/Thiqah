"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import { getInitialOwnerData, saveOwnerData, type Business, type Owner } from "@/lib/mock-data";

interface NewBusinessForm {
  name: string;
  category: string;
  region: string;
}

const initialForm: NewBusinessForm = {
  name: "",
  category: "",
  region: "",
};

export default function HomePage() {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [form, setForm] = useState<NewBusinessForm>(initialForm);

  useEffect(() => {
    const data = getInitialOwnerData();
    setOwner(data);
    setSelectedBusinessId(data.businesses[0]?.id ?? "");
  }, []);

  const selectedBusiness = useMemo(() => {
    return owner?.businesses.find((business) => business.id === selectedBusinessId) ?? owner?.businesses[0];
  }, [owner, selectedBusinessId]);

  const addBusiness = () => {
    if (!owner || !form.name.trim() || !form.category.trim() || !form.region.trim()) {
      return;
    }

    const newBusiness: Business = {
      id: `business-${Date.now()}`,
      name: form.name.trim(),
      category: form.category.trim(),
      region: form.region.trim(),
      statusLabel: "جديد",
      complianceScore: 68,
      lastAudit: "الآن",
      violations: [
        {
          id: `v-${Date.now()}`,
          title: "إكمال بيانات المنشأة",
          severity: "متوسطة",
          description: "أكمل معلومات الرخصة والبيانات الأساسية",
          dueDate: "خلال 2 أيام",
        },
      ],
    };

    const updatedOwner: Owner = {
      ...owner,
      businesses: [...owner.businesses, newBusiness],
    };

    setOwner(updatedOwner);
    saveOwnerData(updatedOwner);
    setSelectedBusinessId(newBusiness.id);
    setForm(initialForm);
    setShowAddDialog(false);
  };

  if (!owner || !selectedBusiness) {
    return <div className="flex min-h-screen items-center justify-center bg-background">جارٍ التحميل...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="الرئيسية" />

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col gap-5 p-4">
          <section className="rounded-[24px] bg-primary-container p-5 text-on-primary-container shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">مرحباً</p>
                <h1 className="text-2xl font-bold">{owner.name}</h1>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <span className="material-symbols-outlined text-[24px]">storefront</span>
              </div>
            </div>
            <p className="mt-3 text-sm opacity-90">هذا هو ملخص منشآتِك اليومي وسجل المخالفات التي تحتاج إلى متابعة.</p>
          </section>

          <section className="rounded-[24px] bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-on-surface-variant">منشأتك</p>
                <h2 className="text-lg font-semibold text-on-surface">اختر منشأة</h2>
              </div>
              <button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-on-primary"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                إضافة منشأة
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {owner.businesses.map((business) => {
                const isActive = selectedBusiness.id === business.id;
                return (
                  <button
                    key={business.id}
                    onClick={() => setSelectedBusinessId(business.id)}
                    className={`rounded-2xl border p-3 text-right transition-all ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-outline-variant bg-surface-container-low"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-on-surface">{business.name}</p>
                        <p className="text-sm text-on-surface-variant">{business.category} • {business.region}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {business.statusLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[24px] bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-on-surface-variant">ملخص المنشأة</p>
                <h3 className="text-xl font-semibold text-on-surface">{selectedBusiness.name}</h3>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {selectedBusiness.complianceScore}%
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface-container p-3">
                <p className="text-xs text-on-surface-variant">آخر تدقيق</p>
                <p className="mt-1 text-base font-semibold text-on-surface">{selectedBusiness.lastAudit}</p>
              </div>
              <div className="rounded-2xl bg-surface-container p-3">
                <p className="text-xs text-on-surface-variant">المنطقة</p>
                <p className="mt-1 text-base font-semibold text-on-surface">{selectedBusiness.region}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-primary/10 p-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                <p className="text-sm font-semibold text-primary">نسبة الالتزام</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${selectedBusiness.complianceScore}%` }} />
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">تحتاج {selectedBusiness.violations.length} خطوة لإكمال التحسينات</p>
            </div>
          </section>

          <section className="rounded-[24px] bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-on-surface">إجراءات سريعة</h3>
              <span className="text-sm text-on-surface-variant">{selectedBusiness.category}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-2xl bg-surface-container p-3 text-right">
                <span className="material-symbols-outlined text-primary">camera_alt</span>
                <p className="mt-2 text-sm font-semibold text-on-surface">التقاط صورة</p>
              </button>
              <button className="rounded-2xl bg-surface-container p-3 text-right">
                <span className="material-symbols-outlined text-primary">description</span>
                <p className="mt-2 text-sm font-semibold text-on-surface">تقرير سريع</p>
              </button>
              <button className="rounded-2xl bg-surface-container p-3 text-right">
                <span className="material-symbols-outlined text-primary">task_alt</span>
                <p className="mt-2 text-sm font-semibold text-on-surface">مراجعة الاشتراطات</p>
              </button>
              <button className="rounded-2xl bg-surface-container p-3 text-right">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <p className="mt-2 text-sm font-semibold text-on-surface">تنبيه الفريق</p>
              </button>
            </div>
          </section>

          <section className="rounded-[24px] bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-on-surface">المخالفات الحالية</h3>
              <span className="text-sm text-primary">{selectedBusiness.violations.length} عناصر</span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {selectedBusiness.violations.map((violation) => (
                <motion.div
                  key={violation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-outline-variant bg-surface-container-low p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{violation.title}</p>
                      <p className="mt-1 text-sm text-on-surface-variant">{violation.description}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      violation.severity === "عالية"
                        ? "bg-error/10 text-error"
                        : violation.severity === "متوسطة"
                          ? "bg-tertiary/10 text-tertiary"
                          : "bg-primary/10 text-primary"
                    }`}>
                      {violation.severity}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-on-surface-variant">
                    <span>الموعد: {violation.dueDate}</span>
                    <button className="font-semibold text-primary">تعديل</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showAddDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4"
            onClick={() => setShowAddDialog(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-md rounded-[24px] bg-surface-container-lowest p-4 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-on-surface">إضافة منشأة جديدة</h3>
                <button onClick={() => setShowAddDialog(false)} className="rounded-full p-2 hover:bg-surface-container-high">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <label className="flex flex-col gap-1 text-sm text-on-surface-variant">
                  اسم المنشأة
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3 text-right text-on-surface"
                    placeholder="مثال: مقهى الريحان"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-on-surface-variant">
                  النوع
                  <input
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                    className="rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3 text-right text-on-surface"
                    placeholder="مثال: مقهى"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-on-surface-variant">
                  المنطقة
                  <input
                    value={form.region}
                    onChange={(event) => setForm({ ...form, region: event.target.value })}
                    className="rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3 text-right text-on-surface"
                    placeholder="مثال: الخبر"
                  />
                </label>
              </div>

              <button
                onClick={addBusiness}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary"
              >
                <span className="material-symbols-outlined">save</span>
                حفظ المنشأة
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
