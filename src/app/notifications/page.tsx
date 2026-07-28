"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Header } from "@/components/shared/header";
import {
  getInitialNotifications,
  getInitialOwnerData,
  getSelectedBusinessId,
  saveNotifications,
  saveSelectedBusinessId,
  type AppNotification,
  type NotificationType,
  type Owner,
} from "@/lib/mock-data";

const ALL_FILTER = "all";

const typeConfig: Record<
  NotificationType,
  { icon: string; bg: string; text: string; label: string }
> = {
  license: { icon: "badge", bg: "bg-tertiary/10", text: "text-tertiary", label: "الرخص" },
  violation: { icon: "report", bg: "bg-error/10", text: "text-error", label: "مخالفة" },
  audit: { icon: "fact_check", bg: "bg-primary/10", text: "text-primary", label: "تدقيق" },
  checklist: {
    icon: "checklist",
    bg: "bg-secondary-container",
    text: "text-on-secondary-container",
    label: "اشتراطات",
  },
  system: { icon: "insights", bg: "bg-primary/10", text: "text-primary", label: "تنبيه" },
};

export default function NotificationsPage() {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  useEffect(() => {
    const data = getInitialOwnerData();
    setOwner(data);
    setNotifications(getInitialNotifications());

    const storedBusinessId = getSelectedBusinessId(data.businesses[0]?.id);
    setActiveFilter(storedBusinessId || ALL_FILTER);
  }, []);

  const selectFilter = (businessId: string) => {
    setActiveFilter(businessId);
    if (businessId !== ALL_FILTER) {
      saveSelectedBusinessId(businessId);
    }
  };

  const filteredNotifications = useMemo(() => {
    const list =
      activeFilter === ALL_FILTER
        ? notifications
        : notifications.filter((notification) => notification.businessId === activeFilter);

    return [...list].sort((a, b) => Number(a.isRead) - Number(b.isRead));
  }, [notifications, activeFilter]);

  const unreadCount = useMemo(
    () => filteredNotifications.filter((notification) => !notification.isRead).length,
    [filteredNotifications]
  );

  const businessName = (businessId: string) =>
    owner?.businesses.find((business) => business.id === businessId)?.name ?? "";

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      );
      saveNotifications(updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const targetIds = new Set(filteredNotifications.map((notification) => notification.id));
      const updated = prev.map((notification) =>
        targetIds.has(notification.id) ? { ...notification, isRead: true } : notification
      );
      saveNotifications(updated);
      return updated;
    });
  };

  if (!owner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="الإشعارات" />

      <main className="relative w-full pt-16 pb-24 bg-background min-h-screen">
        <div className="flex flex-col gap-4 p-4">
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex items-center gap-2 w-max">
              <button
                onClick={() => selectFilter(ALL_FILTER)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === ALL_FILTER
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface-variant"
                }`}
              >
                جميع المنشآت
              </button>
              {owner.businesses.map((business) => (
                <button
                  key={business.id}
                  onClick={() => selectFilter(business.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeFilter === business.id
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  {business.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">
              {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : "لا توجد إشعارات غير مقروءة"}
            </p>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-semibold text-primary"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {filteredNotifications.map((notification) => {
                const config = typeConfig[notification.type];
                return (
                  <motion.button
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => markAsRead(notification.id)}
                    className={`flex items-start gap-3 rounded-2xl p-4 text-right shadow-sm transition-colors ${
                      notification.isRead
                        ? "bg-surface-container-lowest"
                        : "bg-primary/5 border border-primary/20"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                    >
                      <span className={`material-symbols-outlined ${config.text}`}>
                        {config.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-on-surface">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-on-surface-variant">
                        {activeFilter === ALL_FILTER && (
                          <>
                            <span className="font-medium text-primary">
                              {businessName(notification.businessId)}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span>{notification.createdAt}</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>

            {filteredNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface-container-lowest p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                  notifications_off
                </span>
                <p className="text-sm text-on-surface-variant">لا توجد إشعارات لهذه المنشأة</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
