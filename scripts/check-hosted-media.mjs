import { closeSync, openSync, readSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

let total = 0;
for (const [folder, expected] of [
  ["artifacts/videos", 10],
  ["demos", 10],
  ["walkthroughs", 5],
]) {
  const directory = path.resolve("public", folder);
  let count = 0;
  for (const file of readdirSync(directory).filter((file) =>
    file.endsWith(".mp4"),
  )) {
    const source = path.join(directory, file);
    const descriptor = openSync(source, "r");
    const header = Buffer.alloc(128);
    try {
      readSync(descriptor, header, 0, header.length, 0);
    } finally {
      closeSync(descriptor);
    }
    if (
      statSync(source).size < 1024 ||
      header
        .toString("utf8")
        .startsWith("version https://git-lfs.github.com/") ||
      header.subarray(4, 8).toString() !== "ftyp"
    ) {
      throw new Error(
        file +
          " is an unresolved Git LFS pointer, not a playable video. Enable Git LFS in the Vercel project Git settings and redeploy.",
      );
    }
    count++;
  }
  if (count !== expected)
    throw new Error("Expected " + expected + " playable videos in " + folder);
  total += count;
}
console.log(
  "Verified " +
    total +
    " actual video files, including optimized demos and concept walkthroughs; no unresolved Git LFS pointers.",
);
