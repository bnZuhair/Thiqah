export interface Violation {
  id: string;
  title: string;
  severity: "عالية" | "متوسطة" | "منخفضة";
  description: string;
  dueDate: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  region: string;
  statusLabel: string;
  complianceScore: number;
  lastAudit: string;
  violations: Violation[];
}

export interface Owner {
  id: string;
  name: string;
  role: string;
  businesses: Business[];
}

const initialOwnerData: Owner = {
  id: "owner-1",
  name: "عبد الله السوادي",
  role: "مالك المنشأة",
  businesses: [
    {
      id: "business-1",
      name: "مطعم القرموشي",
      category: "مطعم",
      region: "الرياض",
      statusLabel: "يحتاج تحسين",
      complianceScore: 74,
      lastAudit: "أمس",
      violations: [
        {
          id: "v-1",
          title: "تأخر تحديث شهادة السلامة",
          severity: "عالية",
          description: "الشهادة منتهية الصلاحية منذ 8 أيام",
          dueDate: "اليوم",
        },
        {
          id: "v-2",
          title: "عدم وضوح لافتة المحل",
          severity: "متوسطة",
          description: "اللافتة غير واضحة في الليل وتحتاج مراجعة",
          dueDate: "غداً",
        },
      ],
    },
    {
      id: "business-2",
      name: "شاورما الطعم",
      category: "سندويتشات",
      region: "جدة",
      statusLabel: "مقبول",
      complianceScore: 86,
      lastAudit: "قبل 3 أيام",
      violations: [
        {
          id: "v-3",
          title: "مخزن المواد غير مصنّف بشكل كامل",
          severity: "منخفضة",
          description: "بعض الصناديق غير موثقة حسب المتطلبات",
          dueDate: "بعد 3 أيام",
        },
      ],
    },
  ],
};

export function getInitialOwnerData(): Owner {
  if (typeof window === "undefined") {
    return initialOwnerData;
  }

  const savedOwner = window.localStorage.getItem("thiqah-mock-owner");
  if (!savedOwner) {
    return initialOwnerData;
  }

  try {
    return JSON.parse(savedOwner) as Owner;
  } catch {
    return initialOwnerData;
  }
}

export function saveOwnerData(owner: Owner) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("thiqah-mock-owner", JSON.stringify(owner));
  }
}
