import { Options as InspectOptions } from 'vite-plugin-inspect';
import { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import { Options as VueOptions } from '@vitejs/plugin-vue';
import { RollupReplaceOptions } from '@rollup/plugin-replace';
import { PluginOption } from 'vite';
import { PackageJson } from 'type-fest';
import type { GenerateConfigOptions } from './options';
export interface GenerateConfigPluginsOptions {
    /**
     * 是否启用 @vitejs/plugin-vue 进行 vue 模板解析。配置规则如下，对于其他插件也适用。
     * - false / undefined 不启用该插件
     * - true 启用该插件，采用默认配置
     * - Options 启用该插件，应用具体配置
     * @default false
     */
    pluginVue?: boolean | VueOptions;
    /**
       * 是否启用 vite-plugin-inspect 进行产物分析。
       * @default false
       */
    pluginInspect?: boolean | InspectOptions;
    /**
       * 是否启用 rollup-plugin-visualizer 进行产物分析。
       * @default false
       */
    pluginVisualizer?: boolean | PluginVisualizerOptions;
    /**
       * 是否启用 @rollup/plugin-replace 进行产物内容替换。
       * @default false
       */
    pluginReplace?: boolean | RollupReplaceOptions;
}
/**
 * 获取预设插件配置
 * @param options 预设插件相关配置选项
 */
export declare function getPresetPlugins(options?: GenerateConfigPluginsOptions): PluginOption[];
/**
 * 获取完整的插件配置
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export declare function getPlugin(packageJson?: PackageJson, options?: GenerateConfigOptions): PluginOption[];
/**
 * 处理单个预设插件
 * @param options 预设插件相关配置选项
 * @param key 目标选项名称
 * @param plugin 对应的插件函数
 * @param defaultOptions 插件默认选项
 */
export declare function getPresetPlugin<K extends keyof GenerateConfigPluginsOptions>(options: GenerateConfigPluginsOptions, key: K, plugin: (...args: any[]) => PluginOption, defaultOptions?: GenerateConfigPluginsOptions[K]): PluginOption;
