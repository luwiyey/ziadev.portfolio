import { mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
await mkdir("public/walkthroughs", { recursive: true });
for (const name of [
  "fieldwork",
  "morrow",
  "halfcourt",
  "ridgeline",
  "clearline",
]) {
  const source = "design/preview-sources/concept-" + name;
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      source + "-cover.png",
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-quality",
      "86",
      "public/previews/concept-" + name + ".webp",
    ],
    { stdio: "ignore" },
  );
  const filter = "crop=iw:720:0:'(ih-720)*min(1,max(0,(t-1)/10))'";
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-loop",
      "1",
      "-framerate",
      "24",
      "-i",
      source + "-full.png",
      "-vf",
      filter,
      "-t",
      "12",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "25",
      "-threads",
      "2",
      "-pix_fmt",
      "yuv420p",
      "-an",
      "-movflags",
      "+faststart",
      "public/walkthroughs/" + name + ".mp4",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  console.log(name + ": actual-layout overview and cover prepared.");
}
