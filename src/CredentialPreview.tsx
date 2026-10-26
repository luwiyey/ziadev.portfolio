import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, Minus, Plus, X } from "lucide-react";
import "./credential-preview.css";

export default function CredentialPreview({
  certificate,
  onClose,
}: {
  certificate: { title: string; file: string; type: "image" | "pdf" };
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="credential-dialog"
      aria-labelledby="credential-preview-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="credential-toolbar">
        <div>
          <p>Credential preview</p>
          <h2 id="credential-preview-title">{certificate.title}</h2>
        </div>
        <button
          autoFocus
          onClick={onClose}
          aria-label="Close certificate preview"
        >
          <X size={19} />
          <span>Close</span>
        </button>
      </div>
      <div className={"credential-document" + (zoomed ? " is-zoomed" : "")}>
        {certificate.type === "pdf" ? (
          <iframe src={certificate.file} title={certificate.title} />
        ) : (
          <img src={certificate.file} alt={certificate.title} />
        )}
      </div>
      <div className="credential-bottom">
        <button onClick={onClose}>
          <ArrowLeft size={16} /> Back to portfolio
        </button>
        <div>
          {certificate.type === "image" && (
            <button onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>
              {zoomed ? <Minus size={15} /> : <Plus size={15} />}
              {zoomed ? "Fit to screen" : "Zoom in"}
            </button>
          )}
          <a href={certificate.file} download>
            <Download size={15} /> Download
          </a>
        </div>
      </div>
    </dialog>
  );
}
