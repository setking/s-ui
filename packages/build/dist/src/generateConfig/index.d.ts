import { UserConfig } from 'vite';
import { GenerateConfigOptions } from './options';
/**
 * 生成Vite构建配置
 * @param customOptions 自定义构建项
 * @param viteConfig 自定义vite配置
 */
export declare function generateConfig(customOptions?: GenerateConfigOptions, viteConfig?: UserConfig): Promise<Record<string, any>>;
export * from './plugins';
export * from './options';
export * from './lib';
export * from './external';
export * from './pluginMoveDts';
export * from './pluginSetPackageJson';
