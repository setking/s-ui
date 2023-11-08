import { mergeConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { readFile, writeFile, cp } from "node:fs/promises";
import { resolve, relative, sep, join, basename } from "node:path";
import inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import "lodash";
import { statSync } from "node:fs";
import { getParsedCommandLineOfConfigFile, sys } from "typescript";
function splitVar(varName) {
  const reg = /[A-Z]{2,}(?=[A-Z][a-z]+|[0-9]|[^a-zA-Z0-9])|[A-Z]?[a-z]+|[A-Z]|[0-9]/g;
  return varName.match(reg) || [];
}
function kebabCase(varName) {
  const nameArr = splitVar(varName);
  return nameArr.map((item) => item.toLowerCase()).join("-");
}
function camelCase(varName, isFirstWordUppercase = false) {
  const nameArr = splitVar(varName);
  return nameArr.map((item, index) => {
    if (index === 0 && !isFirstWordUppercase) {
      return item.toLowerCase();
    }
    return item.charAt(0).toLowerCase() + item.slice(1).toLowerCase();
  }).join("");
}
async function readJsonFile(filePath) {
  const buffer = await readFile(filePath, "utf-8");
  return JSON.parse(buffer);
}
async function writeJsonFile(filePath, ...rest) {
  await writeFile(filePath, JSON.stringify(...rest), "utf-8");
}
function usePathAbs(basePath) {
  return (...paths) => normalizePath(resolve(basePath, ...paths));
}
const absCwd = usePathAbs(process.cwd());
function usePathRel(basePath) {
  return (path, ignoreLocalSignal = true) => {
    const result = normalizePath(relative(basePath, path));
    if (result.slice(0, 2) === "..") {
      return result;
    }
    return ignoreLocalSignal ? result : `./${result}`;
  };
}
const relCwd = usePathRel(process.cwd());
function normalizePath(path) {
  if (sep === "/") {
    return path;
  }
  return path.replace(new RegExp(`\\${sep}`, "g"), "/");
}
function defaultOptions() {
  return {
    entry: "src/index.ts",
    outDir: "dist",
    fileName: "",
    exports: ".",
    mode: "package",
    dts: "",
    onSetPkg: () => {
    },
    pluginVue: false,
    pluginInspect: false,
    pluginVisualizer: false,
    pluginReplace: false
  };
}
function getOptions(options) {
  return {
    ...defaultOptions(),
    ...options
  };
}
function isObjectLike(val) {
  return val !== null && typeof val === "object";
}
function isFunction(val) {
  return typeof val === "function";
}
function getLib(packageJson = {}, options = {}) {
  const {
    entry,
    outDir,
    mode,
    fileName
  } = getOptions(options);
  const finalName = fileName || kebabCase(packageJson.name || "");
  const libOptions = {
    entry,
    // 全量构建只生产umd产物
    formats: mode === "package" ? ["es", "umd"] : ["umd"],
    name: camelCase(finalName),
    fileName: (format) => {
      const formatName = format;
      return getOutFileName(finalName, formatName, mode);
    }
  };
  return {
    lib: libOptions,
    // full-min 模式下全量构建，需要混淆代码，生成 sourcemap 文件，且不清空产物目录
    minify: mode === "full-min" ? "esbuild" : false,
    sourcemap: mode === "full-min",
    emptyOutDir: mode === "package",
    outDir
  };
}
function getOutFileName(fileName, format, buildMode) {
  const formatName = format;
  const ext = formatName === "es" ? ".mjs" : ".umd.js";
  let tail;
  if (buildMode === "full") {
    tail = ".full.js";
  } else if (buildMode === "full-min") {
    tail = ".full.min.js";
  } else {
    tail = ext;
  }
  return `${fileName}${tail}`;
}
function resolveEntry(entry) {
  console.log("absEntryFolder----", entry);
  const absEntry = absCwd(entry);
  const isEntryFile = statSync(absEntry).isFile();
  const absEntryFolder = isEntryFile ? join(absEntry, "..") : absEntry;
  return {
    abs: absEntry,
    rel: relCwd(absEntryFolder),
    isFile: isEntryFile
  };
}
function pluginSetPackageJson(packageJson = {}, options = {}) {
  const finalOptions = getOptions(options);
  const {
    onSetPkg,
    mode,
    fileName,
    outDir,
    exports
  } = finalOptions;
  if (mode !== "package") {
    return null;
  }
  const finalName = fileName || kebabCase(packageJson.name || "");
  return {
    name: "set-package-json",
    apply: "build",
    async closeBundle() {
      const packageJsonObj = packageJson || {};
      const exportsData = {};
      const umd = relCwd(
        absCwd(outDir, getOutFileName(fileName, "umd", mode)),
        false
      );
      if (exports === ".") {
        packageJsonObj.main = umd;
      }
      exportsData.require = umd;
      const es = relCwd(
        absCwd(outDir, getOutFileName(finalName, "es", mode)),
        false
      );
      if (exports === ".") {
        packageJsonObj.module = es;
      }
      exportsData.import = es;
      const dtsEntry = getDtsPath(options);
      exportsData.types = dtsEntry;
      if (exports === ".") {
        packageJsonObj.types = dtsEntry;
      }
      if (!isObjectLike(packageJsonObj.exports)) {
        packageJsonObj.exports = {};
      }
      Object.assign(packageJsonObj.exports, {
        [exports]: exportsData,
        // 默认暴露的出口
        "./*": "./*"
      });
      if (isFunction(onSetPkg)) {
        await onSetPkg(packageJsonObj, finalOptions);
      }
      await writeJsonFile(absCwd("package.json"), packageJsonObj, null, 2);
    }
  };
}
function getDtsPath(options = {}) {
  const {
    entry,
    outDir
  } = getOptions(options);
  const { rel, isFile } = resolveEntry(entry);
  const entryFileName = isFile ? basename(entry).replace(/\..*$/, ".d.ts") : "index.d.ts";
  return relCwd(
    absCwd(outDir, rel, entryFileName),
    false
  );
}
function pluginMoveDts(options = {}) {
  const {
    entry,
    outDir,
    mode,
    dts
  } = getOptions(options);
  if (mode !== "package" || !dts) {
    return null;
  }
  const tsconfigs = getParsedCommandLineOfConfigFile(dts, {}, sys);
  if (!tsconfigs) {
    throw new Error(`Could not find tsconfig file: ${dts}`);
  }
  const { rootDir, outDir: tsOutDir } = tsconfigs.options;
  if (!rootDir || !tsOutDir) {
    throw new Error(`Could not find rootDir or outDir in tsconfig file: ${dts}`);
  }
  const relRoot = usePathRel(rootDir);
  const absRoot = usePathAbs(rootDir);
  const relPackagePath = relRoot(process.cwd());
  const { rel: relEntryPath } = resolveEntry(entry);
  return {
    name: "move-dts",
    apply: "build",
    async closeBundle() {
      const source = absRoot(tsOutDir, relPackagePath, relEntryPath);
      const target = absCwd(outDir, relEntryPath);
      try {
        await cp(source, target, {
          force: true,
          recursive: true
        });
      } catch (err) {
        console.log(`[${relPackagePath}]: failed to move dts!`);
        console.error(err);
      }
    }
  };
}
function getPresetPlugins(options = {}) {
  const result = [];
  result.push(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getPresetPlugin(options, "pluginVue", vue),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getPresetPlugin(options, "pluginInspect", inspect),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getPresetPlugin(options, "pluginVisualizer", visualizer),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getPresetPlugin(options, "pluginReplace", replace)
  );
  return result;
}
function getPlugin(packageJson = {}, options = {}) {
  const { mode, dts } = options;
  const result = getPresetPlugins(options);
  if (mode === "package") {
    result.push(pluginSetPackageJson(packageJson, options));
    if (dts) {
      result.push(pluginMoveDts(options));
    }
  }
  return result;
}
function getPresetPlugin(options, key, plugin, defaultOptions2) {
  const value = options[key];
  if (!value) {
    return null;
  }
  return plugin(
    isObjectLike(value) ? value : defaultOptions2
  );
}
function getExternal(packageJson = {}, options = {}) {
  const { dependencies = {}, peerDependencies = {} } = packageJson;
  const { mode } = getOptions(options);
  const defaultExternal = [
    /^node:.*/
  ];
  const toReg = (item) => new RegExp(`^${item}`);
  return defaultExternal.concat(
    Object.keys(peerDependencies).map(toReg),
    mode === "package" ? Object.keys(dependencies).map(toReg) : []
  );
}
async function generateConfig(customOptions, viteConfig) {
  const options = getOptions(customOptions);
  const packageJson = await readJsonFile(absCwd("package.json"));
  const libOptions = getLib(packageJson, options);
  const external = getExternal(packageJson, options);
  const plugins = getPlugin(packageJson, options);
  const result = {
    plugins,
    build: {
      ...libOptions,
      rollupOptions: {
        external,
        plugins: [
          nodePolyfills()
        ]
      }
    }
  };
  return mergeConfig(result, viteConfig || {});
}
export {
  absCwd,
  camelCase,
  defaultOptions,
  generateConfig,
  getExternal,
  getLib,
  getOptions,
  getOutFileName,
  getPlugin,
  getPresetPlugin,
  getPresetPlugins,
  kebabCase,
  pluginMoveDts,
  pluginSetPackageJson,
  readJsonFile,
  relCwd,
  resolveEntry,
  usePathAbs,
  usePathRel,
  writeJsonFile
};
