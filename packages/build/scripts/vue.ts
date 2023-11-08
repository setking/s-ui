import { mergeConfig, UserConfig } from 'vite';
import { presetUno, PresetUnoOptions } from 'unocss/preset-uno';
import unocss from 'unocss/vite';
import transformerDirectives from '@unocss/transformer-directives';
import { generateConfig } from './common';
import { absCwd, relCwd, GenerateConfigOptions } from '../src';
// eslint-disable-next-line import/no-relative-packages
import { suiPreset, SuiPresetOptions } from '../../styles/src/unoPreset';

export interface GenerateVueConfigOptions extends GenerateConfigOptions {

  /** 是否启用 UnoCSS 插件 */
  pluginUno?: boolean;

  /** 传递给 unocss/preset-uno 预设的配置 */
  presetUnoOptions?: PresetUnoOptions;

  /** 传递给组件库 UnoCSS 预设的选项 */
  presetSuiOptions?: SuiPresetOptions;
}

export async function GenerateVueConfig(
  customOptions?: GenerateVueConfigOptions,
  viteConfig?: UserConfig,
) {
  const {
    pluginUno = true,
    presetSuiOptions,
    presetUnoOptions,
  } = customOptions || {};
  const configPreset:UserConfig = {
    plugins: [
      pluginUno ? unocss({
        configFile: false,
        presets: [
          presetUno({
            preflight: false,
            ...presetUnoOptions,
          }),
          suiPreset(presetSuiOptions),
        ],
        transformers: [
          transformerDirectives(),
        ],
      }) : null,
    ],
  };
  const optionsPreset: GenerateConfigOptions = {
    pluginVue: true,
    onSetPkg: (pkg, options) => {
      const exports: Record<string, string> = {
        './style.css': relCwd(absCwd(options.outDir, 'style.css'), false),
      };
      Object.assign(
        pkg.exports as Record<string, any>,
        exports,
      );
    },
  };
  const res = await generateConfig({
    ...optionsPreset,
    ...customOptions,
  }, mergeConfig(configPreset, viteConfig || {}));
  return res;
}
