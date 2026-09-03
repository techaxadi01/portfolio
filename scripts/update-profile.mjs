import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourcePath = process.argv[2]
  ? path.resolve(root, process.argv[2])
  : path.join(root, "data", "cv-data.txt");
const targetPath = path.join(root, ".env.local");

async function main() {
  let raw;
  try {
    raw = await readFile(sourcePath, "utf8");
  } catch {
    throw new Error(`Could not read ${sourcePath}. Edit data/cv-data.txt first.`);
  }

  const data = JSON.parse(raw);
  const lines = [
    `NEXT_PUBLIC_FULL_NAME=${data.fullName ?? ""}`,
    `NEXT_PUBLIC_ROLE=${data.role ?? ""}`,
    `NEXT_PUBLIC_LOCATION=${data.location ?? ""}`,
    `NEXT_PUBLIC_EMAIL=${data.email ?? ""}`,
    `NEXT_PUBLIC_GITHUB=${data.github ?? ""}`,
    `NEXT_PUBLIC_LINKEDIN=${data.linkedin ?? ""}`,
    `NEXT_PUBLIC_INTRO=${data.intro ?? ""}`,
    `NEXT_PUBLIC_PHOTO=${data.photo ?? ""}`
  ];

  await writeFile(targetPath, `${lines.join("\n")}\n`, "utf8");
  console.log(`Updated ${path.relative(root, targetPath)} from ${path.relative(root, sourcePath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
