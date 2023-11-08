import { PluginOption } from 'vite';
import { PackageJson } from 'type-fest';
import { basename } from 'node:path';
import {
  absCwd,
  relCwd,
  kebabCase,
  writeJsonFile,
} from '../utils';
// eslint-disable-next-line import/no-relative-packages
import { isFunction, isObjectLike } from '../../../utils/src';
import { getOutFileName, resolveEntry } from './lib';
import { getOptions, GenerateConfigOptions } from './options';
/**
 * 自定义插件，实现对 package.json 内容的修改与回写。
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export function pluginSetPackageJson(
  packageJson: PackageJson = {},
  options: GenerateConfigOptions = {},
): PluginOption {
  const finalOptions = getOptions(options);
  const {
    onSetPkg,
    mode,
    fileName,
    outDir,
    exports,
  } = finalOptions;

  if (mode !== 'package') {
    return null;
  }
  const finalName = fileName || kebabCase(packageJson.name || '');
  return {
    name: 'set-package-json',
    apply: 'build',
    async closeBundle() {
      const packageJsonObj = packageJson || {};
      const exportsData: Record<string, any> = {};
      const umd = relCwd(
        absCwd(outDir, getOutFileName(fileName, 'umd', mode)),
        false,
      );
      if (exports === '.') { packageJsonObj.main = umd; }
      exportsData.require = umd;

      const es = relCwd(
        absCwd(outDir, getOutFileName(finalName, 'es', mode)),
        false,
      );
      if (exports === '.') { packageJsonObj.module = es; }
      exportsData.import = es;

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const dtsEntry = getDtsPath(options);
      exportsData.types = dtsEntry;
      if (exports === '.') { packageJsonObj.types = dtsEntry; }
      if (!isObjectLike(packageJsonObj.exports)) {
        packageJsonObj.exports = {};
      }
      Object.assign(packageJsonObj.exports, {
        [exports]: exportsData,
        // 默认暴露的出口
        './*': './*',
      });
      if (isFunction(onSetPkg)) {
        await onSetPkg(packageJsonObj, finalOptions);
      }
      await writeJsonFile(absCwd('package.json'), packageJsonObj, null, 2);
    },
  };
}
function getDtsPath(options: GenerateConfigOptions = {}) {
  const {
    entry,
    outDir,
  } = getOptions(options);
  const { rel, isFile } = resolveEntry(entry);
  const entryFileName = isFile ? basename(entry).replace(/\..*$/, '.d.ts') : 'index.d.ts';
  return relCwd(
    absCwd(outDir, rel, entryFileName),
    false,
  );
}
