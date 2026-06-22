import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roots = [
  join("node_modules", "zod"),
  join("node_modules", "@tanstack", "start-plugin-core", "node_modules", "zod"),
  join("node_modules", "@tanstack", "router-generator", "node_modules", "zod"),
  join("node_modules", "@tanstack", "router-plugin", "node_modules", "zod"),
];

for (const root of roots) {
  const localesDir = join(root, "v4", "locales");
  if (!existsSync(localesDir)) continue;

  const localeNames = readdirSync(localesDir)
    .filter((file) => file.endsWith(".js") && file !== "index.js")
    .map((file) => file.slice(0, -3))
    .sort();

  if (!localeNames.includes("en")) continue;

  const js = [
    ...localeNames.map(
      (name) => `export { default as ${name.replace(/-/g, "_")} } from "./${name}.js";`,
    ),
    "",
  ].join("\n");

  const cjs = [
    '"use strict";',
    ...localeNames.map(
      (name) =>
        `Object.defineProperty(exports, "${name.replace(/-/g, "_")}", { enumerable: true, get: () => require("./${name}.cjs") });`,
    ),
    "",
  ].join("\n");

  const dts = [
    ...localeNames.map(
      (name) => `export { default as ${name.replace(/-/g, "_")} } from "./${name}.js";`,
    ),
    "",
  ].join("\n");

  writeFileSync(join(localesDir, "index.js"), js);
  writeFileSync(join(localesDir, "index.cjs"), cjs);
  writeFileSync(join(localesDir, "index.d.ts"), dts);
  writeFileSync(join(localesDir, "index.d.cts"), dts);
}
