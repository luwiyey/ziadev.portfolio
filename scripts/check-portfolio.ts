import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import {
  additionalProjects,
  certificates,
  clientContributions,
  designCollections,
  imageArtifacts,
  interactiveProjects,
  personalInterests,
  videoArtifacts,
} from "../src/portfolio-content";

const all = [
  ...videoArtifacts,
  ...imageArtifacts,
  ...additionalProjects,
  ...interactiveProjects,
  ...designCollections,
];
assert.equal(
  new Set(all.map((project) => project.id)).size,
  all.length,
  "Project IDs must be unique.",
);
assert.equal(interactiveProjects.length, 5);
assert.equal(
  additionalProjects.filter((project) => project.id.startsWith("concept-"))
    .length,
  10,
);
assert.ok(
  !all.some((project) => ["lab-planner", "lab-target"].includes(project.id)),
);
for (const interest of personalInterests)
  assert.ok(
    existsSync("public/interests/" + interest.id + ".webp"),
    "Missing icon: " + interest.id,
  );
for (const project of all) {
  assert.ok(
    project.title && project.role && project.tags.length,
    "Incomplete project: " + project.id,
  );
  assert.ok(
    existsSync(path.join("public", project.src)),
    "Missing media: " + project.src,
  );
  for (const media of [project.src, project.preview, project.walkthrough].filter(Boolean) as string[]) {
    assert.ok(statSync(path.join("public", media)).size > 100, 'Empty media: ' + media);
  }
  if (project.preview)
    assert.ok(
      existsSync(path.join("public", project.preview)),
      "Missing preview: " + project.preview,
    );
  if (project.walkthrough)
    assert.ok(
      existsSync(path.join("public", project.walkthrough)),
      "Missing walkthrough: " + project.walkthrough,
    );
  for (const resource of project.resources ?? [])
    assert.ok(resource.href.startsWith("https://"));
  if (project.liveUrl)
    assert.ok(
      project.liveUrl.startsWith("https://") ||
        project.liveUrl.startsWith("/?concept="),
      "Unsafe URL: " + project.id,
    );
  if (project.id.startsWith("concept-"))
    assert.equal(project.kind, "Self-initiated concept");
}
for (const certificate of certificates)
  assert.ok(existsSync(path.join("public", certificate.file)));
assert.equal(
  clientContributions.find((client) => client.name === "Holistic Vybez")?.href,
  "",
  "Do not link the repurposed domain.",
);
const main = readFileSync("src/Portfolio.tsx", "utf8");
assert.ok(
  main.includes('Resume <Download size={16} aria-hidden="true" />'),
  "The header resume action must use a download icon, not a navigation arrow.",
);
const order = main.match(/const projectOrder = \[([\s\S]*?)\];/)?.[1] ?? "";
const postersIndex = order.indexOf('"design-posters"');
assert.ok(
  postersIndex >= 0 && postersIndex < order.indexOf('"design-infographics"'),
  "Posters (001) must precede infographics (002).",
);
const intro = main.slice(
  main.indexOf('<div className="hero-intro">'),
  main.indexOf('<h1 id="hero-title"'),
);
assert.deepEqual(
  [...intro.matchAll(/<p>([^<]+)<\/p>/g)].map((match) => match[1]),
  ["Web applications.", "A creative eye.", "A mind for how things work."],
  "Keep the three independent phrases above the name.",
);
const hero = main.slice(
  main.indexOf('id="top"'),
  main.indexOf('<section id="work"'),
);
assert.equal(
  [...hero.matchAll(/href="#work"/g)].length,
  1,
  "The hero must have only one projects action.",
);
assert.ok(
  !hero.includes("hero-explore") && !hero.includes("View projects"),
  "Do not restore a detached arrow or duplicate projects action.",
);
assert.ok(
  hero.includes('className="button button-dark hero-work-link" href="#work"') &&
    hero.includes('Explore my work <ArrowDown size={17} aria-hidden="true" />'),
  "Use one clear projects button with its own downward arrow.",
);
for (const id of ["work", "about", "skills", "credentials", "contact"])
  assert.ok(
    main.includes('id="' + id + '"'),
    "Missing navigation section: " + id,
  );
assert.ok(
  !main.includes("Open original"),
  "Raw-image navigation trap must not return.",
);
for (const file of [
  "index.html",
  "original.html",
  "mobile.html",
  "company.html",
])
  assert.ok(existsSync(file));
function checkJson(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) checkJson(file);
    else if (file.endsWith(".json"))
      assert.doesNotThrow(() => JSON.parse(readFileSync(file, "utf8")), file);
    else if (file.endsWith(".liquid")) {
      const schema = readFileSync(file, "utf8").match(
        /{% schema %}([\s\S]*?){% endschema %}/,
      );
      if (schema)
        assert.doesNotThrow(() => JSON.parse(schema[1]), file + " schema");
    }
  }
}
checkJson("design/shopify/forma");
console.log(
  "Verified " +
    all.length +
    " project records, all local media, ten concepts, five experiments, fourteen icons, navigation targets, and Shopify JSON schemas.",
);
