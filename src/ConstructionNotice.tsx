import { useEffect, useRef } from "react";
import { ArrowRight, TriangleAlert } from "lucide-react";

export default function ConstructionNotice({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      className="construction-notice"
      ref={ref}
      aria-labelledby="construction-title"
      aria-describedby="construction-description"
      onCancel={onContinue}
    >
      <div className="construction-stamp">
        <TriangleAlert size={40} strokeWidth={1.5} />
        <span>
          WORK IN
          <br />
          PROGRESS
        </span>
      </div>
      <p className="eyebrow">A quick note before you explore</p>
      <h2 id="construction-title">
        Still building.
        <br />
        <em>Always improving.</em>
      </h2>
      <p id="construction-description">
        This portfolio is under construction. Some projects, previews, and
        details are still being updated. You’re welcome to explore with that in
        mind.
      </p>
      <button className="button button-dark" onClick={onContinue} autoFocus>
        Continue to portfolio <ArrowRight size={18} />
      </button>
      <span className="construction-footnote">
        Thanks for taking a look. This notice appears once per browsing session.
      </span>
    </dialog>
  );
}
