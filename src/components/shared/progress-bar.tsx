"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  current,
  total,
  label,
  className = "",
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 shadow-sm ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-on-surface">إجمالي الإنجاز</span>
        <span className="text-sm text-primary-container font-bold">
          {current} من {total} اشتراط مكتمل
        </span>
      </div>
      <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {label && (
        <p className="text-xs text-on-surface-variant">{label}</p>
      )}
    </div>
  );
}
