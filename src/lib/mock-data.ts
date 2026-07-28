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
}

export interface Owner {
  id: string;
  name: string;
  role: string;
  businesses: Business[];
}

const OWNER_STORAGE_KEY = "thiqah-mock-owner";
const SELECTED_BUSINESS_STORAGE_KEY = "thiqah-selected-business-id";

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
    violations: [],
    checklistStatuses: createEmptyChecklistStatuses(),
  };
}
