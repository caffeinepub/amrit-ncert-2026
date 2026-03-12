import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PDFModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export default function PDFModal({ pdfUrl, title, onClose }: PDFModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/80"
      data-ocid="pdf.modal"
    >
      <div className="flex items-center justify-between bg-secondary px-4 py-3">
        <span className="text-white font-semibold truncate max-w-xs">
          {title}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onClose}
          data-ocid="pdf.close_button"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex-1 bg-gray-200">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={title}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
