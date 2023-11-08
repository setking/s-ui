import { join, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { importDirectory, cleanupSVG, parseColors, isEmptyColor, runSVGO } from "@iconify/tools";
import { getIconsCSS } from "@iconify/utils";
const outputFile = async (file, data, options) => {
  if (typeof file === "string") {
    const dir = join(file, "..");
    if (dir && dir !== "." && dir !== "..") {
      await mkdir(join(file, ".."), { recursive: true });
    }
  }
  await writeFile(file, data, options);
};
function absCwd(...paths) {
  return resolve(process.cwd(), ...paths).replace(/\\/g, "/");
}
async function generateIconify(options = {}) {
  const {
    iconsDir = "icons",
    prefix = "op",
    cssIconSelector = `.i-${prefix}-{name}`,
    cssCommonSelector = "",
    cssOutput = "",
    jsonOutput = absCwd(iconsDir, "icons.json")
  } = options;
  const { log } = console;
  const iconSet = await importDirectory(iconsDir, { prefix });
  const names = [];
  await iconSet.forEach(async (name, type) => {
    if (type !== "icon") {
      return;
    }
    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return;
    }
    try {
      await cleanupSVG(svg);
      await parseColors(svg, {
        defaultColor: "currentColor",
        callback: (_attr, colorStr, color) => !color || isEmptyColor(color) ? colorStr : "currentColor"
      });
      await runSVGO(svg);
    } catch (err) {
      log(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }
    iconSet.fromSVG(name, svg);
    names.push(name);
  });
  const exportedJson = iconSet.export();
  const exported = `${JSON.stringify(exportedJson, null, 2)}
`;
  await outputFile(jsonOutput, exported, "utf8");
  log(`Saved JSON (${exported.length} bytes)`);
  if (cssOutput) {
    const css = getIconsCSS(exportedJson, names, {
      iconSelector: cssIconSelector,
      commonSelector: cssCommonSelector
    });
    await outputFile(cssOutput, css, "utf8");
    log(`Saved CSS (${css.length} bytes)`);
  }
}
export {
  generateIconify
};
