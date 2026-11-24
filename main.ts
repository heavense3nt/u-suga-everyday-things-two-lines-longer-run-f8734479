// Everyday Things, Two Lines — a traffic jam, explained to a 10-year-old.
//
// Line 1: one vivid sentence, one analogy — a traffic jam as a river that has
// turned to jelly. River (the flow of cars, all going one way together) crossed
// with jelly (the wobble, the slowness you can see and spoon) is concrete,
// surprising, and built from things a 10-year-old can picture and hold.
// Line 2: one sentence on why the analogy works — what it maps (the cars still
// creeping along together in a single slow flow) and what it leaves out (jelly
// never honks, gets angry, or slips down a side street to escape).
//
// The program writes exactly those two lines to entry.txt and nothing else.
// Gate: entry.txt must be UTF-8 text of 1-400 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";

const LINES = [
  "A traffic jam is a river that has turned to jelly, wobbling forward one spoonful at a time.",
  "It maps how all the cars still creep along together in one slow flow, but it leaves out that jelly never honks, gets angry, or slips down a side street to escape.",
];

const text = LINES.join("\n") + "\n";

// The gate counts characters: two lines, 255 chars total, well inside 1-400.
// Each line must also be exactly one sentence: the judge's brief wants line 1
// as one vivid sentence and line 2 as one sentence on the mapping and its limits.
if (LINES.length !== 2) throw new Error(`expected 2 lines, got ${LINES.length}`);
if (text.length > 400) throw new Error(`entry is ${text.length} chars, over the 400-char gate`);
if (text.trim().length === 0) throw new Error("entry is blank");
for (const [i, line] of LINES.entries()) {
  const sentences = line.split(/[.!?]/).filter((s) => s.trim().length > 0).length;
  if (sentences !== 1) throw new Error(`line ${i + 1} has ${sentences} sentences, expected 1`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Absolute output dir: use it as-is. Relative: resolve it against the repo root
// (the working directory the grader runs main.ts from). Never join the bot dir.
const dest = isAbsolute(outDir)
  ? join(outDir, "entry.txt")
  : join(process.cwd(), outDir, "entry.txt");

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, text, "utf8");
