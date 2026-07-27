"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function CameraContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item") || "1";

  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showDetection, setShowDetection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetection(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCapture = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      router.push(`/evaluation?item=${itemId}`);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen bg-on-surface overflow-hidden">
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <motion.div
            className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(13,212,117,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 w-[80%] aspect-[4/3] flex items-center justify-center">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
          <div className="w-full h-full border-2 border-dashed border-white/40 rounded-xl animate-pulse" />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: showDetection ? 1 : 0, y: showDetection ? 0 : 8 }}
            className="absolute -top-12 bg-primary/90 backdrop-blur-md px-4 py-1 rounded-full"
          >
            <span className="text-on-primary text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              تم التعرف على اللوحة
            </span>
          </motion.div>
        </div>

        <div className="absolute top-8 left-0 right-0 px-6 z-20 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-lg px-6 py-3 rounded-2xl">
            <p className="text-white text-lg font-semibold mb-1">وجّه الكاميرا نحو لافتة المحل</p>
            <p className="text-white/80 text-sm">تأكد من وضوح الإضاءة والنص</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 pb-12 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between gap-6 max-w-sm mx-auto">
            <button
              onClick={() => setIsFlashOn(!isFlashOn)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined">
                {isFlashOn ? "flash_on" : "flash_off"}
              </span>
            </button>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 rounded-full scale-125 animate-ping opacity-20" />
              <button
                onClick={handleCapture}
                className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform duration-75"
              >
                <div className="w-16 h-16 rounded-full border-[3px] border-gray-600 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary shadow-inner" />
                </div>
              </button>
            </div>

            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90">
              <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white/50 bg-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-lg font-semibold">جارِ التحليل...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white"
      >
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
}

export default function CameraPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-on-surface">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CameraContent />
    </Suspense>
  );
}
