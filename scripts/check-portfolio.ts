import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { additionalProjects, certificates, clientContributions, imageArtifacts, interactiveProjects, videoArtifacts } from '../src/portfolio-content';

const all = [...videoArtifacts, ...imageArtifacts, ...additionalProjects, ...interactiveProjects];
assert.equal(new Set(all.map(project => project.id)).size, all.length, 'Project IDs must be unique.');
assert.equal(interactiveProjects.length, 6);
assert.equal(additionalProjects.filter(project => project.id.startsWith('concept-')).length, 5);
for (const project of all) {
  assert.ok(project.title && project.role && project.tags.length, 'Incomplete project: ' + project.id);
  assert.ok(existsSync(path.join('public', project.src)), 'Missing media: ' + project.src);
  if (project.preview) assert.ok(existsSync(path.join('public', project.preview)), 'Missing preview: ' + project.preview);
  if (project.liveUrl) assert.ok(project.liveUrl.startsWith('https://') || project.liveUrl.startsWith('/?concept='), 'Unsafe URL: ' + project.id);
  if (project.id.startsWith('concept-')) assert.equal(project.kind, 'Self-initiated concept');
}
for (const certificate of certificates) assert.ok(existsSync(path.join('public', certificate.file)));
assert.equal(clientContributions.find(client => client.name === 'Holistic Vybez')?.href, '', 'Do not link the repurposed domain.');
const main = readFileSync('src/Portfolio.tsx', 'utf8');
for (const id of ['work', 'about', 'skills', 'credentials', 'contact']) assert.ok(main.includes('id="' + id + '"'), 'Missing navigation section: ' + id);
assert.ok(!main.includes('Open original'), 'Raw-image navigation trap must not return.');
for (const file of ['index.html', 'original.html', 'mobile.html', 'company.html']) assert.ok(existsSync(file));
function checkJson(directory: string) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) checkJson(file);
    else if (file.endsWith('.json')) assert.doesNotThrow(() => JSON.parse(readFileSync(file, 'utf8')), file);
    else if (file.endsWith('.liquid')) {
      const schema = readFileSync(file, 'utf8').match(/{% schema %}([\s\S]*?){% endschema %}/);
      if (schema) assert.doesNotThrow(() => JSON.parse(schema[1]), file + ' schema');
    }
  }
}
checkJson('design/shopify/forma');
console.log('Verified ' + all.length + ' project records, all local media, five concepts, six experiments, navigation targets, and Shopify JSON schemas.');
