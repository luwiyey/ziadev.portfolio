import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import "./lab.css";

function Planner() {
  const [day, setDay] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const habits = [
    "A glass of water first",
    "Make something small",
    "Take a screen-free walk",
    "Read a few good pages",
  ];
  const done = habits.filter((_, i) => completed[day + "-" + i]).length;
  return (
    <div className="lab-planner">
      <div className="phone-shell">
        <div className="phone-status">
          <span>9:41</span>
          <span>POCKET / BROWSER PROTOTYPE</span>
        </div>
        <p className="lab-eyebrow">A LITTLE AT A TIME.</p>
        <h3>
          Good days
          <br />
          are <em>made.</em>
        </h3>
        <div
          className="planner-days"
          role="group"
          aria-label="Choose a planner day"
        >
          {["M", "T", "W", "T", "F", "S", "S"].map((label, index) => (
            <button
              key={index}
              onClick={() => setDay(index)}
              aria-label={
                [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ][index]
              }
              aria-pressed={day === index}
            >
              {label}
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="planner-progress">
          <span>{done} of 4 little wins</span>
          <progress value={done} max={4} aria-label="Daily habits completed" />
        </div>
        <div className="planner-habits">
          {habits.map((habit, index) => (
            <label key={habit}>
              <input
                type="checkbox"
                checked={Boolean(completed[day + "-" + index])}
                onChange={(event) =>
                  setCompleted({
                    ...completed,
                    [day + "-" + index]: event.target.checked,
                  })
                }
              />
              <span>{habit}</span>
              <Check size={17} />
            </label>
          ))}
        </div>
        <p className="planner-note" role="status">
          {done === 4
            ? "A little progress. A very good day."
            : "You do not have to do everything. Start here."}
        </p>
      </div>
      <div className="lab-side-note">
        <span>01 / MOBILE INTERFACE</span>
        <h4>
          Small screen.
          <br />
          Thoughtful details.
        </h4>
        <p>
          Change the day and check off a few habits. Each day has its own
          progress.
        </p>
        <p className="lab-disclaimer">
          Android-style interaction study in the browser. This is not a
          downloadable Android application.
        </p>
      </div>
    </div>
  );
}

function TargetGame() {
  const [phase, setPhase] = useState<"idle" | "running" | "paused" | "done">(
    "idle",
  );
  const [remaining, setRemaining] = useState(20);
  const [score, setScore] = useState(0);
  const [spot, setSpot] = useState(4);
  useEffect(() => {
    if (phase !== "running") return;
    if (remaining <= 0) {
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, remaining]);
  const start = () => {
    setScore(0);
    setRemaining(20);
    setSpot(4);
    setPhase("running");
  };
  const hit = () => {
    if (phase !== "running") return;
    setScore((value) => value + 1);
    setSpot((value) => (value + 4) % 9);
  };
  return (
    <div className="target-game">
      <div className="target-game-head">
        <div>
          <p className="lab-eyebrow">BROWSER ARCADE / NO DOWNLOAD</p>
          <h3>
            NEON
            <br />
            <span>TARGET PRACTICE</span>
          </h3>
        </div>
        <div className="target-score">
          <span>
            SCORE <strong>{score}</strong>
          </span>
          <span>
            TIME <strong>{remaining}s</strong>
          </span>
        </div>
      </div>
      <div className="target-arena">
        {phase === "running" ? (
          <button
            className="neon-target"
            aria-label="Hit the target"
            onClick={hit}
            style={{
              left: 16 + (spot % 3) * 33 + "%",
              top: 18 + Math.floor(spot / 3) * 32 + "%",
            }}
          >
            <span />+
          </button>
        ) : (
          <div className="target-message">
            <h4>
              {phase === "done"
                ? score + " targets tagged."
                : phase === "paused"
                  ? "Take a breather."
                  : "Ready, steady, tag."}
            </h4>
            <p>
              {phase === "done"
                ? "One more round?"
                : "Tap the target or use Tab and Enter. You have 20 seconds."}
            </p>
            <button
              onClick={phase === "paused" ? () => setPhase("running") : start}
            >
              {phase === "paused"
                ? "Resume"
                : phase === "done"
                  ? "Play again"
                  : "Start game"}{" "}
              <Play size={15} />
            </button>
          </div>
        )}
      </div>
      <div className="target-game-foot">
        <p>Companion browser experiment, not the original Android game.</p>
        {phase === "running" && (
          <button onClick={() => setPhase("paused")}>
            <Pause size={15} /> Pause
          </button>
        )}
        {phase !== "idle" && (
          <button onClick={start}>
            <RotateCcw size={15} /> Restart
          </button>
        )}
      </div>
    </div>
  );
}

function MaterialLab() {
  const [color, setColor] = useState("#a64150");
  const [speed, setSpeed] = useState(12);
  const [angle, setAngle] = useState(25);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return (
    <div className="material-lab">
      <div
        className="material-stage"
        style={
          {
            "--cube-color": color,
            "--spin-duration": speed + "s",
            "--view-angle": angle + "deg",
          } as CSSProperties
        }
      >
        <span className="material-coordinate">
          X / Y / Z<br />
          CSS TRANSFORMS
        </span>
        <div className="cube-view">
          <div className={"material-cube" + (paused ? " is-paused" : "")}>
            {["front", "back", "right", "left", "top", "bottom"].map((face) => (
              <div key={face} className={"cube-face face-" + face}>
                <span>zia / material study</span>
              </div>
            ))}
          </div>
        </div>
        <div className="material-shadow" />
      </div>
      <div className="lab-controls">
        <p className="lab-eyebrow">02 / SPATIAL EXPERIMENT</p>
        <h3>
          Form, color,
          <br />
          <em>a little perspective.</em>
        </h3>
        <label>
          Surface color{" "}
          <input
            type="color"
            value={color}
              onInput={(event) => setColor(event.currentTarget.value)}
            onChange={(event) => setColor(event.target.value)}
          />
        </label>
        <label>
          Rotation period <span>{speed}s</span>
          <input
            type="range"
            min="4"
            max="24"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
        <label>
          View angle <span>{angle} degrees</span>
          <input
            type="range"
            min="-50"
            max="50"
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
          />
        </label>
        <button onClick={() => setPaused(!paused)}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
          {paused ? "Play rotation" : "Pause rotation"}
        </button>
        <p className="lab-disclaimer">
          A lightweight CSS 3D study, not a WebGL render. Reduced-motion
          preferences are respected.
        </p>
      </div>
    </div>
  );
}

function MotionLab() {
  const [duration, setDuration] = useState(2);
  const [easing, setEasing] = useState("ease-in-out");
  const [playing, setPlaying] = useState(false);
  const [shape, setShape] = useState("circle");
  return (
    <div className="motion-lab">
      <div>
        <p className="lab-eyebrow">03 / TIMING IS A DESIGN DECISION.</p>
        <h3>
          The same movement.
          <br />
          <em>A different feeling.</em>
        </h3>
        <p>
          Pick an easing curve and press Play. Compare how the shape starts,
          moves, and settles.
        </p>
      </div>
      <div className="motion-track">
        <span>00</span>
        <div className="motion-runway">
          <div
            className={"motion-dot " + shape}
            style={{
              animationDuration: duration + "s",
              animationTimingFunction: easing,
              animationPlayState: playing ? "running" : "paused",
            }}
          />
        </div>
        <span>01</span>
      </div>
      <div className="motion-controls">
        <label>
          Duration: {duration}s
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />
        </label>
        <label>
          Easing
          <select
            value={easing}
            onChange={(event) => setEasing(event.target.value)}
          >
            {["linear", "ease-in", "ease-out", "ease-in-out"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Shape
          <select
            value={shape}
            onChange={(event) => setShape(event.target.value)}
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </label>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <p className="lab-disclaimer">
        Interactive keyframe study. System reduced-motion settings disable the
        animation.
      </p>
    </div>
  );
}

function luminance(hex: string) {
  const channels = [1, 3, 5]
    .map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function DesignLab() {
  const [background, setBackground] = useState("#f5e8cf");
  const [foreground, setForeground] = useState("#681c30");
  const [size, setSize] = useState(20);
  const [font, setFont] = useState("Editorial");
  const light = Math.max(luminance(background), luminance(foreground));
  const dark = Math.min(luminance(background), luminance(foreground));
  const contrast = (light + 0.05) / (dark + 0.05);
  return (
    <div className="design-lab">
      <div
        className="design-preview"
        style={{
          background,
          color: foreground,
          fontSize: size,
          fontFamily:
            font === "Editorial"
              ? "Georgia,serif"
              : '"Bricolage Grotesque",sans-serif',
        }}
      >
        <span className="design-mark">aA /</span>
        <h3>
          Make it
          <br />
          <em>feel like you.</em>
        </h3>
        <p>
          A good interface starts with a few considered choices. Color. Type.
          Room to breathe.
        </p>
        <span className="design-preview-tag">LIVE DESIGN STUDY</span>
      </div>
      <div className="lab-controls">
        <p className="lab-eyebrow">04 / PALETTE & TYPE</p>
        <label>
          Background{" "}
          <input
            type="color"
            value={background}
              onInput={(event) => setBackground(event.currentTarget.value)}
            onChange={(event) => setBackground(event.target.value)}
          />
        </label>
        <label>
          Text color{" "}
          <input
            type="color"
            value={foreground}
              onInput={(event) => setForeground(event.currentTarget.value)}
            onChange={(event) => setForeground(event.target.value)}
          />
        </label>
        <label>
          Type size <span>{size}px</span>
          <input
            type="range"
            min="16"
            max="30"
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
          />
        </label>
        <label>
          Type direction
          <select
            value={font}
            onChange={(event) => setFont(event.target.value)}
          >
            <option>Editorial</option>
            <option>Geometric</option>
          </select>
        </label>
        <div
          className={
            "contrast-result " + (contrast >= 4.5 ? "passes" : "fails")
          }
          aria-live="polite"
        >
          <strong>{contrast.toFixed(2)}:1</strong>
          <span>
            {contrast >= 4.5
              ? "AA normal-text contrast: pass"
              : "AA normal-text contrast: needs improvement"}
          </span>
        </div>
        <p className="lab-disclaimer">
          Checks text contrast only, not overall accessibility compliance.
          Normal text needs a ratio of at least 4.5:1.
        </p>
      </div>
    </div>
  );
}

function BoardLab() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Sketch a clearer navigation", stage: 0 },
    { id: 2, title: "Build the small-screen layout", stage: 1 },
    { id: 3, title: "Check keyboard navigation", stage: 2 },
  ]);
  const [title, setTitle] = useState("");
  const nextId = useRef(4);
  return (
    <div className="board-lab">
      <p className="lab-eyebrow">FOCUSBOARD / A SMALL WORKSPACE</p>
      <h3>
        Less juggling.
        <br />
        <em>More doing.</em>
      </h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          setTasks([
            ...tasks,
            { id: nextId.current++, title: title.trim(), stage: 0 },
          ]);
          setTitle("");
        }}
      >
        <label htmlFor="lab-task-title">A task worth making space for</label>
        <div>
          <input
            id="lab-task-title"
            maxLength={70}
            placeholder="Add a small next step..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <button type="submit" aria-label="Add task">
            <Plus size={19} />
          </button>
        </div>
      </form>
      <div className="board-columns">
        {["To do", "In progress", "Done"].map((stage, index) => (
          <section key={stage}>
            <h4>
              {stage}
              <span>{tasks.filter((task) => task.stage === index).length}</span>
            </h4>
            {tasks
              .filter((task) => task.stage === index)
              .map((task) => (
                <article key={task.id}>
                  <p>{task.title}</p>
                  <div>
                    <button
                      aria-label={"Delete " + task.title}
                      onClick={() =>
                        setTasks(tasks.filter((item) => item.id !== task.id))
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setTasks(
                          tasks.map((item) =>
                            item.id === task.id
                              ? { ...item, stage: (item.stage + 1) % 3 }
                              : item,
                          ),
                        )
                      }
                      aria-label={
                        "Move " +
                        task.title +
                        " to " +
                        ["To do", "In progress", "Done"][(task.stage + 1) % 3]
                      }
                    >
                      {index === 2 ? "Reopen" : "Move"} <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            {!tasks.some((task) => task.stage === index) && (
              <p className="board-empty">A little room for what is next.</p>
            )}
          </section>
        ))}
      </div>
      <p className="lab-disclaimer" role="status">
        {tasks.length} tasks / {tasks.filter((task) => task.stage === 2).length}{" "}
        complete. Browser-only demo; changes reset when closed.
      </p>
    </div>
  );
}

const demos: Record<string, () => React.ReactNode> = {
  planner: Planner,
  target: TargetGame,
  material: MaterialLab,
  motion: MotionLab,
  design: DesignLab,
  board: BoardLab,
};
export default function InteractiveLab({
  demo,
  standalone = false,
}: {
  demo: string;
  standalone?: boolean;
}) {
  const Demo = demos[demo];
  return (
    <div className={"interactive-lab" + (standalone ? " standalone-lab" : "")}>
      {standalone && (
        <a className="lab-return" href="/#work">
          <ArrowLeft size={15} /> Back to Zia's portfolio
        </a>
      )}
      {Demo ? <Demo /> : <p>This experiment is not available.</p>}
    </div>
  );
}
