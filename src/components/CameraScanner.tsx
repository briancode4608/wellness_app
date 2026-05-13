import { Camera, X, ScanLine, RotateCcw, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { submitMealScan } from "@/api/health";
import { toast } from "sonner";

interface CameraScannerProps {
  onClose: () => void;
  onScan?: (result: string) => void;
}

const CameraScanner = ({ onClose, onScan }: CameraScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const startCamera = async (mode: "environment" | "user") => {
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera not supported on this device.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: mode } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to access camera";
      setError(msg.includes("Permission") || msg.includes("denied")
        ? "Camera permission denied. Please allow access in your browser settings."
        : msg);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setPhoto(dataUrl);
    stopCamera();
  };

  const retake = () => {
    setPhoto(null);
    startCamera(facingMode);
  };

  const confirm = async () => {
    if (!photo) return;
    setAnalyzing(true);
    try {
      const res = await submitMealScan(photo);
      onScan?.(`${res.data.name} – ${res.data.calories} cal`);
    } catch {
      toast.error("Could not analyze the photo. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground flex flex-col items-center justify-between py-8"
    >
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card/20 flex items-center justify-center z-10"
        aria-label="Close camera"
      >
        <X size={22} className="text-card" />
      </button>

      <div className="text-center pt-4 px-6">
        <p className="text-card text-body-lg font-semibold">
          {error ? "Camera unavailable" : photo ? "Looks good?" : "Point camera at your food"}
        </p>
        <p className="text-card/60 text-caption mt-1">
          {error ? "Check permissions and try again" : photo ? "Confirm to analyze" : "We'll detect and log it for you"}
        </p>
      </div>

      <div className="relative w-full max-w-md aspect-square mx-6 rounded-2xl overflow-hidden bg-foreground/60 flex items-center justify-center">
        {error ? (
          <div className="px-6 text-center">
            <Camera size={48} className="text-card/40 mx-auto mb-3" />
            <p className="text-card/80 text-caption">{error}</p>
          </div>
        ) : photo ? (
          <img src={photo} alt="Captured food" className="w-full h-full object-cover" />
        ) : (
          <>
            <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-6 border-2 border-dashed border-card/40 rounded-2xl pointer-events-none" />
            {analyzing && (
              <motion.div
                animate={{ y: ["-40%", "40%"] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
                className="absolute"
              >
                <ScanLine size={200} className="text-primary opacity-60" />
              </motion.div>
            )}
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex items-center gap-6 pb-4">
        {photo ? (
          <>
            <button
              onClick={retake}
              disabled={analyzing}
              className="w-14 h-14 rounded-full bg-card/20 text-card flex items-center justify-center active:scale-95 disabled:opacity-50"
              aria-label="Retake photo"
            >
              <RotateCcw size={22} />
            </button>
            <button
              onClick={confirm}
              disabled={analyzing}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-body-lg font-bold flex items-center gap-2 active:scale-[0.98] disabled:opacity-60"
            >
              <Check size={18} /> {analyzing ? "Analyzing..." : "Use Photo"}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setFacingMode((m) => (m === "environment" ? "user" : "environment"))}
              disabled={!!error}
              className="w-14 h-14 rounded-full bg-card/20 text-card flex items-center justify-center active:scale-95 disabled:opacity-30"
              aria-label="Switch camera"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={capture}
              disabled={!!error}
              className="w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center active:scale-95 disabled:opacity-50"
              aria-label="Capture photo"
            >
              <Camera size={28} className="text-primary" />
            </button>
            <div className="w-14 h-14" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CameraScanner;
