import { PluginOption } from 'vite';
import { PackageJson } from 'type-fest';
import { GenerateConfigOptions } from './options';
/**
 * 自定义插件，实现对 package.json 内容的修改与回写。
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export declare function pluginSetPackageJson(packageJson?: PackageJson, options?: GenerateConfigOptions): PluginOption;
