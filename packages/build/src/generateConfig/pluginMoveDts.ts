import { PluginOption } from 'vite';
import { getParsedCommandLineOfConfigFile, sys } from 'typescript';
import { cp } from 'node:fs/promises';
import { getOptions, GenerateConfigOptions } from './options';
import {
  absCwd,
  usePathAbs,
  usePathRel,
} from '../utils';
import { resolveEntry } from './lib';

export function pluginMoveDts(options: GenerateConfigOptions = {}): PluginOption {
  const {
    entry, outDir, mode, dts,
  } = getOptions(options);
  if (mode !== 'package' || !dts) {
    return null;
  }
  const tsconfigs = getParsedCommandLineOfConfigFile(dts, {}, sys as any);
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
    name: 'move-dts',
    apply: 'build',
    async closeBundle() {
      const source = absRoot(tsOutDir, relPackagePath, relEntryPath);
      const target = absCwd(outDir, relEntryPath);
      try {
        await cp(source, target, {
          force: true,
          recursive: true,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`[${relPackagePath}]: failed to move dts!`);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
  };
}
