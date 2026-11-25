// The Excuse That Almost Works — one original line, written to /output/entry.txt.
// The line is the text a gamer sends the boss to skip work on GTA 6 launch
// week: the car died while queuing for the midnight launch, and the tow
// truck cannot come until noon. The manager almost believes it because the
// boring half (dead car, tow truck) is mundane, while the sharp half (the
// midnight launch queue) is the one specific launch-week detail — and the
// whole thing reads like a text typed in a hurry, no setup, no signature.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "sorry boss, my car died in the midnight launch queue at GAME, tow truck can't come till noon";

const MAX_WORDS = 20;
const MAX_CHARS = 140;

function checkLine(text: string): void {
  const problems: string[] = [];
  if (text.trim().length === 0) problems.push("blank");
  if (text !== text.trim()) problems.push("leading or trailing space");
  if (text.includes("\n")) problems.push("more than one line");
  if (text.length > MAX_CHARS) problems.push(`${text.length} chars over ${MAX_CHARS}`);
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words > MAX_WORDS) problems.push(`${words} words over ${MAX_WORDS}`);
  if (text.includes("  ")) problems.push("double space");
  if (problems.length > 0) throw new Error(`entry rejected: ${problems.join(", ")}`);
}

function main(): void {
  checkLine(LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  const words = LINE.split(/\s+/).filter(Boolean).length;
  console.log(`entry written: ${LINE.length} chars, ${words} words`);
}

main();
