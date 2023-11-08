(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("node:path"), require("node:fs/promises"), require("@iconify/tools"), require("@iconify/utils")) : typeof define === "function" && define.amd ? define(["exports", "node:path", "node:fs/promises", "@iconify/tools", "@iconify/utils"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiicons = {}, global.node_path, global.promises, global.tools, global.utils));
})(this, function(exports2, node_path, promises, tools, utils) {
  "use strict";
  const outputFile = async (file, data, options) => {
    if (typeof file === "string") {
      const dir = node_path.join(file, "..");
      if (dir && dir !== "." && dir !== "..") {
        await promises.mkdir(node_path.join(file, ".."), { recursive: true });
      }
    }
    await promises.writeFile(file, data, options);
  };
  function absCwd(...paths) {
    return node_path.resolve(process.cwd(), ...paths).replace(/\\/g, "/");
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
    const iconSet = await tools.importDirectory(iconsDir, { prefix });
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
        await tools.cleanupSVG(svg);
        await tools.parseColors(svg, {
          defaultColor: "currentColor",
          callback: (_attr, colorStr, color) => !color || tools.isEmptyColor(color) ? colorStr : "currentColor"
        });
        await tools.runSVGO(svg);
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
      const css = utils.getIconsCSS(exportedJson, names, {
        iconSelector: cssIconSelector,
        commonSelector: cssCommonSelector
      });
      await outputFile(cssOutput, css, "utf8");
      log(`Saved CSS (${css.length} bytes)`);
    }
  }
  exports2.generateIconify = generateIconify;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
