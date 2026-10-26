import { mkdir, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
await mkdir("public/demos", { recursive: true });
for (let i = 1; i <= 10; i++) {
  const name = "video-" + String(i).padStart(2, "0") + ".mp4";
  const input = "public/artifacts/videos/" + name;
  const output = "public/demos/" + name;
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      input,
      "-map",
      "0:v:0",
      "-map",
      "0:a?",
      "-vf",
      "scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "28",
      "-threads",
      "2",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-movflags",
      "+faststart",
      output,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  console.log(
    name +
      ": " +
      Math.round((await stat(input)).size / 1024 / 1024) +
      " MB -> " +
      ((await stat(output)).size / 1024 / 1024).toFixed(1) +
      " MB",
  );
}
