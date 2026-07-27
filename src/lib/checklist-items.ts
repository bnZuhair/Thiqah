export interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  colorClass: string;
  iconColorClass: string;
}

export interface ChecklistItemInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  categoryId: string;
}

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  {
    id: "facade",
    title: "الواجهة والمظهر الخارجي",
    icon: "storefront",
    colorClass: "bg-primary-fixed",
    iconColorClass: "text-primary",
  },
  {
    id: "safety",
    title: "السلامة والأمن",
    icon: "local_fire_department",
    colorClass: "bg-tertiary-fixed",
    iconColorClass: "text-tertiary",
  },
  {
    id: "hygiene",
    title: "النظافة والتجهيزات الداخلية",
    icon: "cleaning_services",
    colorClass: "bg-secondary-container",
    iconColorClass: "text-secondary",
  },
  {
    id: "staff",
    title: "الموظفون",
    icon: "checkroom",
    colorClass: "bg-primary-fixed",
    iconColorClass: "text-primary",
  },
  {
    id: "signage",
    title: "اللوحات والامتثال الرقمي",
    icon: "qr_code_2",
    colorClass: "bg-secondary-container",
    iconColorClass: "text-secondary",
  },
];

export const CHECKLIST_ITEMS: ChecklistItemInfo[] = [
  // الواجهة والمظهر الخارجي
  {
    id: "1",
    title: "لوحة المحل التجارية مطابقة لبيانات الترخيص",
    description: "يجب أن تكون بيانات اللوحة التجارية مطابقة لبيانات الترخيص الصادر.",
    icon: "branding_watermark",
    categoryId: "facade",
  },
  {
    id: "2",
    title: "واجهة المحل خالية من الشروخ والكسور",
    description: "يجب صيانة واجهة المحل/المنشأة والمحافظة عليها خالية من العيوب مثل الكسور والشروخ الكبيرة الواضحة والمسببة للتشوه البصري.",
    icon: "storefront",
    categoryId: "facade",
  },
  {
    id: "3",
    title: "الواجهة خالية من الملصقات غير المصرح بها",
    description: "يجب أن تكون واجهة المحل/المنشأة خالية من الملصقات ما عدا ملصقات الدخول والخروج وأوقات العمل وطرق الدفع الإلكتروني وتعليمات الجهات الحكومية.",
    icon: "label_off",
    categoryId: "facade",
  },
  {
    id: "4",
    title: "السلالم الخارجية من مواد مانعة للانزلاق",
    description: "يجب أن تكون السلالم الخارجية للمبنى مصنوعة من مواد آمنة ومقاومة للانزلاق وشديدة التحمل.",
    icon: "stairs",
    categoryId: "facade",
  },
  {
    id: "5",
    title: "توفر منحدر لذوي الإعاقة وخلوه من العيوب",
    description: "يجب توفير منحدر للأشخاص ذوي الإعاقة في حدود المنشأة، على أن يكون خالياً من العيوب ولا يسبب أي تشوه بصري.",
    icon: "accessible",
    categoryId: "facade",
  },

  // السلامة والأمن
  {
    id: "6",
    title: "توفر طفايات حريق صالحة",
    description: "يجب توفير طفايات حريق مفعلة وصالحة للاستخدام وفق متطلبات كود البناء السعودي للحرائق (SBC-801).",
    icon: "fire_extinguisher",
    categoryId: "safety",
  },
  {
    id: "7",
    title: "مخارج الطوارئ ظاهرة وغير معاقة",
    description: "يجب أن تخلو السلالم والأرصفة الخارجية من أي تركيبات أو معدات تعيق دخول المنشأة أو الخروج منها أو الإخلاء السريع في حالات الطوارئ.",
    icon: "emergency",
    categoryId: "safety",
  },
  {
    id: "8",
    title: "تركيب كاميرات المراقبة الأمنية",
    description: "يجب تركيب كاميرات أمنية وفقاً لما ورد في نظام استخدام كاميرات المراقبة الأمنية ولائحته التنفيذية.",
    icon: "videocam",
    categoryId: "safety",
  },
  {
    id: "9",
    title: "توفر صندوق الإسعافات الأولية",
    description: "يجب توفير صندوق الإسعافات الأولية في المنشأة.",
    icon: "medical_services",
    categoryId: "safety",
  },
  {
    id: "10",
    title: "فتحات التهوية مغطاة بشبك يمنع الحشرات",
    description: "يجب تغطية فتحات التهوية من الخارج بشبك معدني يمنع دخول الحشرات والقوارض.",
    icon: "mode_fan",
    categoryId: "safety",
  },

  // النظافة والتجهيزات الداخلية
  {
    id: "11",
    title: "نظافة الأرضيات والجدران وخلوها من الشروخ",
    description: "يجب صيانة الأرضيات والجدران الداخلية والأسقف والحفاظ على نظافتها والتأكد من خلوها من العيوب والتشققات الكبيرة الواضحة.",
    icon: "cleaning_services",
    categoryId: "hygiene",
  },
  {
    id: "12",
    title: "أحواض غسل الأيدي مجهزة بالصابون والمناشف",
    description: "يجب أن تكون دورات المياه مجهزة بأحواض لغسل الأيدي، مع الصابون والمناشف الورقية أو مجفف اليدين بالقرب منها.",
    icon: "wash",
    categoryId: "hygiene",
  },
  {
    id: "13",
    title: "سلال مهملات تفتح بالقدم في دورات المياه",
    description: "يجب أن تكون دورات المياه مزودة بسلال مهملات تفتح بالقدم لعدم تلوث الأيدي عند فتح السلال.",
    icon: "delete",
    categoryId: "hygiene",
  },
  {
    id: "14",
    title: "عدم تخزين المواد مباشرة على الأرض",
    description: "يمنع التخزين على الأرض بشكل مباشر، ويجب أن يكون التخزين على ارتفاع (15) سم عن الأرض ومسافة (5) سم من الحائط.",
    icon: "inventory_2",
    categoryId: "hygiene",
  },
  {
    id: "15",
    title: "حاويات النفايات تفتح دون لمس اليد",
    description: "يجب أن تكون حاويات النفايات في وحدات مستقلة تُفتح بآلية لا تعتمد على اللمس باليد.",
    icon: "delete_sweep",
    categoryId: "hygiene",
  },

  // الموظفون
  {
    id: "16",
    title: "الزي الموحد ونظافته",
    description: "يجب أن يرتدي جميع العاملين الملابس الخارجية النظيفة التي تؤمن مظهراً مهنياً لائقاً يتناسب مع مهام العامل.",
    icon: "checkroom",
    categoryId: "staff",
  },
  {
    id: "17",
    title: "تغطية الرأس والذراعين أثناء التحضير",
    description: "يجب تغطية شعر الرأس والذراعين بإحكام للعاملين في إعداد وتحضير الأغذية.",
    icon: "face",
    categoryId: "staff",
  },
  {
    id: "18",
    title: "ارتداء القفازات أثناء تحضير الأغذية",
    description: "يجب على العاملين في إعداد وتحضير الأغذية ارتداء القفازات التي تُستخدم مرة واحدة (الخالية من اللاتكس) وتغييرها بانتظام.",
    icon: "back_hand",
    categoryId: "staff",
  },
  {
    id: "19",
    title: "خلو العاملين من الحلي والساعات",
    description: "يمنع على العاملين في مناطق تداول الأغذية ارتداء ساعات اليد أو الحلي.",
    icon: "watch",
    categoryId: "staff",
  },

  // اللوحات والامتثال الرقمي
  {
    id: "20",
    title: "رمز QR سليم وواضح على الواجهة",
    description: "يجب وضع الرمز الإلكتروني الموحد QR على واجهة المحل/المنشأة بحالة سليمة وخالية من العيوب.",
    icon: "qr_code_2",
    categoryId: "signage",
  },
  {
    id: "21",
    title: "لوحة أنواع اللحوم ومصدرها",
    description: "يجب تعليق لوحة في مكان ظاهر للعملاء مكتوب عليها أنواع اللحوم المتداولة في المنشأة ومصدرها.",
    icon: "restaurant_menu",
    categoryId: "signage",
  },
  {
    id: "22",
    title: "لوحة مسببات الحساسية والسعرات الحرارية",
    description: "يجب على المنشأة عرض اللوحات التوعوية والإرشادية التي تطلبها الجهات المختصة، ومنها لوحات مسببات الحساسية والسعرات الحرارية للمنتجات الغذائية.",
    icon: "warning",
    categoryId: "signage",
  },
  {
    id: "23",
    title: "ملصق خيارات الدفع الإلكتروني",
    description: "يجب وضع ملصق لخيارات الدفع الإلكتروني المتوفرة على واجهة المحل/المنشأة أو داخل المبنى.",
    icon: "credit_card",
    categoryId: "signage",
  },
  {
    id: "24",
    title: "شهادة السلامة الغذائية سارية المفعول",
    description: "يجب توفير شهادة السلامة الغذائية سارية المفعول.",
    icon: "fmd_bad",
    categoryId: "signage",
  },
];

export const STATUS_OVERRIDES: Record<string, { status: "compliant" | "violation"; statusText: string }> = {
  "6": { status: "compliant", statusText: "مكتمل ومطابق" },
  "16": { status: "violation", statusText: "الزي غير موحد - مخالفة رصدت" },
};

export function getChecklistItem(id: string): ChecklistItemInfo | undefined {
  return CHECKLIST_ITEMS.find((item) => item.id === id);
}

export function getCategory(id: string): ChecklistCategory | undefined {
  return CHECKLIST_CATEGORIES.find((category) => category.id === id);
}

export function getItemsByCategory(categoryId: string): ChecklistItemInfo[] {
  return CHECKLIST_ITEMS.filter((item) => item.categoryId === categoryId);
}
