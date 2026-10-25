// Runs every quality gate in order and writes docs/QA-REPORT.md.
// Usage: npm run qa            (production rules: placeholders must be filled)
//        DEMO=1 npm run qa     (pitch demo: missing owner facts reported, not failed)
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const gates = [
  ['build', 'npm run build'],
  ['check', 'npm run check'],
  ['test (unit and Playwright)', 'npm run test'],
  ['links', 'npm run links'],
  ['lighthouse', 'npm run lighthouse'],
  ['audit:content', 'npm run audit:content'],
  ['audit:contrast', 'npm run audit:contrast'],
  ['audit:placeholders', 'npm run audit:placeholders'],
];

const rows = [];
const details = [];
let failed = 0;
for (const [name, cmd] of gates) {
  const t0 = Date.now();
  const r = spawnSync(cmd, { cwd: root, shell: true, encoding: 'utf8', env: process.env, maxBuffer: 64 * 1024 * 1024 });
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const ok = r.status === 0;
  if (!ok) failed++;
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`
    .replace(/\u001b\[[0-9;]*m/g, '')
    .split('\n')
    .filter((l) => l.trim())
    .slice(-25)
    .join('\n');
  rows.push(`| ${name} | ${ok ? 'Pass' : 'FAIL'} | ${secs} s |`);
  details.push(`### ${name}\n\n\`${cmd}\`\n\n\`\`\`\n${out}\n\`\`\`\n`);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} (${secs} s)`);
}

const report = [
  '# QA report',
  '',
  `Run on ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC, mode: ${process.env.DEMO ? 'pitch demo (DEMO=1)' : 'production'}.`,
  '',
  '| Gate | Result | Time |',
  '|---|---|---|',
  ...rows,
  '',
  '## Output (last lines of each gate)',
  '',
  ...details,
].join('\n');
writeFileSync(join(root, 'docs/QA-REPORT.md'), report);
console.log(`\n${failed ? `${failed} gate(s) failed` : 'All gates passed'}. Report: docs/QA-REPORT.md`);
process.exit(failed ? 1 : 0);
