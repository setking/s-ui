import { mergeConfigs, Preset, UserConfig } from 'unocss';
import { Theme } from 'unocss/preset-mini';
import {
  baseConfig,
  themeConfig,
  buttonConfig,
} from './unocss';

const configMaps = {
  theme: themeConfig,
  button: buttonConfig,
} satisfies Record<string, UserConfig<Theme>>;

type ConfigKeys = keyof typeof configMaps;

export interface SuiPresetOptions {
  include?: ConfigKeys[];
  exclude?: ConfigKeys[];
}

export function suiPreset(options: SuiPresetOptions = {}): Preset {
  const {
    include = Object.keys(configMaps) as ConfigKeys[],
    exclude = [],
  } = options;

  // 根据 include 和 exclude 选项决定哪些组件的 UnoCSS 预设将要被集成
  const components = new Set<ConfigKeys>();
  include.forEach((key) => components.add(key));
  exclude.forEach((key) => components.delete(key));
  const configs = Array.from(components)
    .map((component) => configMaps[component])
    .filter((item) => item);

  // 基础预设任何时候都会生效
  configs.unshift(baseConfig);

  // 合并所有预设
  const mergedConfig = mergeConfigs(configs);

  return {
    name: 'sui-preset',
    ...mergedConfig,
  };
}
