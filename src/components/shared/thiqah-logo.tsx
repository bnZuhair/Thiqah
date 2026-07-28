"use client";

import Image from "next/image";

interface ThiqahLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const sizeMap = {
  sm: { container: "h-8 w-auto", img: 32 },
  md: { container: "h-10 w-auto", img: 40 },
  lg: { container: "h-20 w-auto", img: 80 },
  xl: { container: "h-32 w-auto", img: 128 },
};

export function ThiqahLogo({
  size = "md",
  className = "",
  showText = false,
}: ThiqahLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo_dark.png"
        alt="Thiqah Logo"
        width={sizeMap[size].img}
        height={sizeMap[size].img}
        className={sizeMap[size].container}
        priority
      />
      {showText && (
        <span className="font-bold text-primary text-xl">ثقة</span>
      )}
    </div>
  );
}
