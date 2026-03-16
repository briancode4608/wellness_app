import { Camera, X, ScanLine } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CameraScannerProps {
  onClose: () => void;
  onScan?: (result: string) => void;
}

const CameraScanner = ({ onClose, onScan }: CameraScannerProps) => {
  const [scanning, setScanning] = useState(false);

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScan?.("Grilled Chicken Salad – 350 cal");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/90 flex flex-col items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card/20 flex items-center justify-center"
      >
        <X size={22} className="text-card" />
      </button>

      <div className="relative w-64 h-64 border-2 border-dashed border-card/40 rounded-2xl flex items-center justify-center mb-8">
        {scanning ? (
          <motion.div
            animate={{ y: ["-40%", "40%"] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          >
            <ScanLine size={200} className="text-primary opacity-60" />
          </motion.div>
        ) : (
          <Camera size={48} className="text-card/50" />
        )}
      </div>

      <p className="text-card text-body-lg font-semibold mb-2">
        {scanning ? "Scanning food..." : "Point camera at your food"}
      </p>
      <p className="text-card/60 text-caption mb-8">
        We'll automatically detect and log it
      </p>

      {!scanning && (
        <button
          onClick={handleSimulateScan}
          className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-body-lg font-bold active:scale-[0.98] transition-transform"
        >
          Scan Food
        </button>
      )}
    </motion.div>
  );
};

export default CameraScanner;
