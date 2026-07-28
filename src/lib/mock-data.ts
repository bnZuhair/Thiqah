import { CHECKLIST_ITEMS, STATUS_OVERRIDES } from "./checklist-items";

export type ChecklistStatus = "pending" | "compliant" | "violation";

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
  checklistStatuses: Record<string, ChecklistStatus>;
  registrationNumber: string;
  nationalAddress: string;
  licenseExpiryDate: string;
  licenseStatus: "active" | "expiring" | "expired";
}

export interface Owner {
  id: string;
  name: string;
  role: string;
  businesses: Business[];
}

export type NotificationType = "license" | "violation" | "audit" | "checklist" | "system";

export interface AppNotification {
  id: string;
  businessId: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const OWNER_STORAGE_KEY = "thiqah-mock-owner";
const SELECTED_BUSINESS_STORAGE_KEY = "thiqah-selected-business-id";
const NOTIFICATIONS_STORAGE_KEY = "thiqah-notifications";

function createEmptyChecklistStatuses() {
  return CHECKLIST_ITEMS.reduce<Record<string, ChecklistStatus>>((acc, item) => {
    acc[item.id] = "pending";
    return acc;
  }, {});
}

function createInitialChecklistStatuses() {
  const statuses = createEmptyChecklistStatuses();
  Object.entries(STATUS_OVERRIDES).forEach(([itemId, override]) => {
    statuses[itemId] = override.status;
  });
  return statuses;
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
      registrationNumber: "1010445566",
      nationalAddress: "7433 طريق الملك فهد، حي الصحافة، الرياض",
      licenseExpiryDate: "1446/05/20 هـ",
      licenseStatus: "expiring",
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
      checklistStatuses: createInitialChecklistStatuses(),
    },
    {
      id: "business-2",
      name: "شاورما الطعم",
      category: "مطعم",
      region: "جدة",
      statusLabel: "مقبول",
      complianceScore: 86,
      lastAudit: "قبل 3 أيام",
      registrationNumber: "4030112233",
      nationalAddress: "3312 طريق الأمير سلطان، حي الروضة، جدة",
      licenseExpiryDate: "1447/09/10 هـ",
      licenseStatus: "active",
      violations: [
        {
          id: "v-3",
          title: "مخزن المواد غير مصنّف بشكل كامل",
          severity: "منخفضة",
          description: "بعض الصناديق غير موثقة حسب المتطلبات",
          dueDate: "بعد 3 أيام",
        },
      ],
      checklistStatuses: createInitialChecklistStatuses(),
    },
  ],
};

const initialNotifications: AppNotification[] = [
  {
    id: "n-1",
    businessId: "business-1",
    type: "license",
    title: "اقترب موعد انتهاء الرخصة",
    message: "رخصة البلدية لمطعم القرموشي ستنتهي خلال 5 أيام. يرجى التجديد لتجنب الغرامات.",
    createdAt: "قبل ساعتين",
    isRead: false,
  },
  {
    id: "n-2",
    businessId: "business-1",
    type: "violation",
    title: "مخالفة جديدة: تأخر تحديث شهادة السلامة",
    message: "الشهادة منتهية الصلاحية منذ 8 أيام، يرجى المعالجة فوراً.",
    createdAt: "قبل 3 ساعات",
    isRead: false,
  },
  {
    id: "n-4",
    businessId: "business-1",
    type: "violation",
    title: "مخالفة: عدم وضوح لافتة المحل",
    message: "اللافتة غير واضحة في الليل وتحتاج مراجعة قبل الغد.",
    createdAt: "أمس",
    isRead: true,
  },
  {
    id: "n-5",
    businessId: "business-1",
    type: "checklist",
    title: "تذكير: عنصر رقابي بحاجة لتحديث",
    message: "يرجى رفع صورة محدثة لمخرج الطوارئ ضمن قائمة الاشتراطات.",
    createdAt: "قبل 3 أيام",
    isRead: true,
  },
  {
    id: "n-6",
    businessId: "business-1",
    type: "system",
    title: "انخفاض نسبة الالتزام",
    message: "انخفضت نسبة التزام مطعم القرموشي إلى 74%. راجع المخالفات الحالية لتحسين التقييم.",
    createdAt: "قبل 4 أيام",
    isRead: true,
  },
  {
    id: "n-7",
    businessId: "business-2",
    type: "checklist",
    title: "مخزن المواد يحتاج تصنيف",
    message: "بعض الصناديق غير موثقة حسب المتطلبات، يرجى استكمال التصنيف خلال 3 أيام.",
    createdAt: "قبل ساعة",
    isRead: false,
  },
  {
    id: "n-8",
    businessId: "business-2",
    type: "audit",
    title: "نتائج التدقيق الأخير جاهزة",
    message: "تقرير التدقيق الذي تم قبل 3 أيام متاح الآن للمراجعة.",
    createdAt: "قبل 3 أيام",
    isRead: true,
  },
  {
    id: "n-9",
    businessId: "business-2",
    type: "license",
    title: "تم تجديد شهادة الدفاع المدني",
    message: "تم تجديد شهادة الدفاع المدني بنجاح، صالحة حتى نهاية العام.",
    createdAt: "الأسبوع الماضي",
    isRead: true,
  },
  {
    id: "n-10",
    businessId: "business-2",
    type: "system",
    title: "تحسن ملحوظ في الالتزام",
    message: "ارتفعت نسبة التزام شاورما الطعم إلى 86%. استمر بالعمل الجيد!",
    createdAt: "الأسبوع الماضي",
    isRead: true,
  },
];

export function getInitialNotifications(): AppNotification[] {
  if (typeof window === "undefined") {
    return initialNotifications;
  }

  const saved = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (!saved) {
    return initialNotifications;
  }

  try {
    return JSON.parse(saved) as AppNotification[];
  } catch {
    return initialNotifications;
  }
}

export function saveNotifications(notifications: AppNotification[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }
}

export function getInitialOwnerData(): Owner {
  if (typeof window === "undefined") {
    return initialOwnerData;
  }

  const savedOwner = window.localStorage.getItem(OWNER_STORAGE_KEY);
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
    window.localStorage.setItem(OWNER_STORAGE_KEY, JSON.stringify(owner));
  }
}

export function getSelectedBusinessId(defaultBusinessId?: string): string {
  if (typeof window === "undefined") {
    return defaultBusinessId ?? "";
  }

  return window.localStorage.getItem(SELECTED_BUSINESS_STORAGE_KEY) ?? defaultBusinessId ?? "";
}

export function saveSelectedBusinessId(businessId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_BUSINESS_STORAGE_KEY, businessId);
  }
}

export function createEmptyBusiness(name: string, category: string, region: string): Business {
  return {
    id: `business-${Date.now()}`,
    name,
    category,
    region,
    statusLabel: "غير مطابق",
    complianceScore: 0,
    lastAudit: "الآن",
    registrationNumber: "—",
    nationalAddress: region,
    licenseExpiryDate: "—",
    licenseStatus: "expired",
    violations: [],
    checklistStatuses: createEmptyChecklistStatuses(),
  };
}
