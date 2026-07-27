"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getChecklistItem } from "@/lib/checklist-items";
import type { ComplianceAnalysis } from "@/lib/ai/schemas";

type CameraStatus = "requesting" | "ready" | "denied" | "unsupported" | "error";

interface TorchConstraintSet extends MediaTrackConstraintSet {
  torch?: boolean;
}

interface TorchCapabilities extends MediaTrackCapabilities {
  torch?: boolean;
}

function CameraContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item") || "1";
  const checklistItem = getChecklistItem(itemId);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  const [status, setStatus] = useState<CameraStatus>("requesting");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isTorchSupported, setIsTorchSupported] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    trackRef.current = null;
    setIsTorchSupported(false);
    setIsFlashOn(false);
  }, []);

  const startCamera = useCallback(async () => {
    stopStream();
    setStatus("requesting");
    setSubmitError(null);
    setCapturedImage(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;
      const [track] = stream.getVideoTracks();
      trackRef.current = track ?? null;
      const capabilities = track?.getCapabilities?.() as TorchCapabilities | undefined;
      setIsTorchSupported(Boolean(capabilities?.torch));

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus("ready");
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setStatus(name === "NotAllowedError" || name === "PermissionDeniedError" ? "denied" : "error");
    }
  }, [stopStream]);

  useEffect(() => {
    startCamera();
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFlash = async () => {
    const track = trackRef.current;
    if (!track || !isTorchSupported) return;
    const next = !isFlashOn;
    try {
      await track.applyConstraints({ advanced: [{ torch: next } as TorchConstraintSet] });
      setIsFlashOn(next);
    } catch {
      // Some devices report torch support but reject the constraint at runtime.
    }
  };

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || status !== "ready") return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

    setCapturedImage(dataUrl);
    stopStream();
    setIsSubmitting(true);
    setSubmitError(null);

    const message = checklistItem
      ? `يرجى تحليل الصورة المرفقة لتقييم الالتزام بالاشتراط التالي: "${checklistItem.title}". ${checklistItem.description}`
      : "يرجى تحليل الصورة المرفقة وتقييم مدى التزام المنشأة بالاشتراطات التنظيمية.";

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, image: dataUrl }),
      });

      if (!response.ok) throw new Error("Request failed");

      const analysis: ComplianceAnalysis = JSON.parse(await response.text());

      sessionStorage.setItem(
        `evaluation:${itemId}`,
        JSON.stringify({ image: dataUrl, analysis, capturedAt: Date.now() })
      );
      router.push(`/evaluation?item=${itemId}`);
    } catch {
      setIsSubmitting(false);
      setSubmitError("تعذّر تحليل الصورة. يرجى المحاولة مرة أخرى.");
      startCamera();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-on-surface overflow-hidden">
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Live camera feed / captured still */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${
            status === "ready" && !capturedImage ? "opacity-100" : "opacity-0"
          }`}
        />
        {capturedImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={capturedImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        {status !== "ready" && !capturedImage && (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        )}

        {/* Permission / error states */}
        {(status === "denied" || status === "unsupported" || status === "error") && !capturedImage && (
          <div className="relative z-20 flex flex-col items-center gap-4 px-8 text-center">
            <span className="material-symbols-outlined text-white/80 text-[56px]">
              {status === "denied" ? "no_photography" : "videocam_off"}
            </span>
            <p className="text-white text-lg font-semibold">
              {status === "denied"
                ? "تم رفض الوصول إلى الكاميرا"
                : status === "unsupported"
                ? "الكاميرا غير مدعومة في هذا المتصفح"
                : "تعذّر تشغيل الكاميرا"}
            </p>
            <p className="text-white/70 text-sm">
              {status === "denied"
                ? "يرجى السماح بالوصول إلى الكاميرا من إعدادات المتصفح ثم إعادة المحاولة."
                : "تأكد من أن الجهاز يحتوي على كاميرا خلفية وأن الاتصال آمن (HTTPS)."}
            </p>
            <button
              onClick={startCamera}
              className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-medium active:scale-95 transition-transform"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Loading */}
        {status === "requesting" && !capturedImage && (
          <div className="relative z-20 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white/80 text-sm">يتم تشغيل الكاميرا...</p>
          </div>
        )}

        {/* Framing guides */}
        {status === "ready" && !capturedImage && (
          <div className="relative z-10 w-[80%] aspect-[4/3] flex items-center justify-center pointer-events-none">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
            <div className="w-full h-full border-2 border-dashed border-white/40 rounded-xl" />
          </div>
        )}

        {/* Guidance header */}
        {!capturedImage && (status === "ready" || status === "requesting") && (
          <div className="absolute top-8 left-0 right-0 px-6 z-20 text-center">
            <div className="inline-block bg-black/40 backdrop-blur-lg px-6 py-3 rounded-2xl">
              <p className="text-white text-lg font-semibold mb-1">
                {checklistItem ? `التقط صورة: ${checklistItem.title}` : "وجّه الكاميرا نحو الهدف"}
              </p>
              <p className="text-white/80 text-sm">
                {checklistItem?.description ?? "تأكد من وضوح الإضاءة والزاوية"}
              </p>
            </div>
          </div>
        )}

        {submitError && (
          <div className="absolute top-24 left-6 right-6 z-30 bg-error/90 backdrop-blur-md px-4 py-3 rounded-xl">
            <p className="text-on-error text-sm text-center">{submitError}</p>
          </div>
        )}

        {/* Bottom controls */}
        {status === "ready" && !capturedImage && (
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-12 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between gap-6 max-w-sm mx-auto">
              <button
                onClick={toggleFlash}
                disabled={!isTorchSupported}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-90 disabled:opacity-30"
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

              <div className="w-12 h-12" />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isSubmitting && (
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
        disabled={isSubmitting}
        className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white disabled:opacity-50"
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
