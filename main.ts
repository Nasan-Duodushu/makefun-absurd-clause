// The Absurd Clause Contest — one sentence, <=200 chars, written as a clause
// that could hide deep inside a terms-of-service agreement. Judge: deadpan
// comedy editor; the joke must come from the legal register as much as from
// the words, with a concrete absurd image. The clause grants the Company a
// tiny, specific power (moving furniture 3 cm) and makes the user agree to
// pretend not to notice — boilerplate until the absurdity hits.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// A clause is [actor, power, condition]: the register does the deadpan work.
const ACTOR = "The Company";
const POWER = "may, without notice, move your furniture three centimetres to the left on the first Tuesday of every month";
const CONDITION = "you agree to pretend not to notice";

function draftClause(actor: string, power: string, condition: string): string {
  const parts = [actor, power];
  return `${parts.join(" ")} and ${condition}.`
    .replace(/\s+/g, " ")
    .trim();
}

function checkClause(text: string): void {
  if (text.length < 1 || text.length > LIMIT) {
    throw new Error(`clause must be 1-${LIMIT} chars, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("clause must be a single sentence");
  }
  if (!text.startsWith("The Company")) {
    throw new Error("clause must open in boilerplate register");
  }
  if (!text.endsWith(".")) {
    throw new Error("clause must end on a full stop");
  }
}

const line = draftClause(ACTOR, POWER, CONDITION);
checkClause(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
