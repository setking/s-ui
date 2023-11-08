import { PackageJson } from 'type-fest';
import { GenerateConfigOptions } from './options';
/**
 * 获取 build.rollupOptions.external 依赖外部化相关的配置
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export declare function getExternal(packageJson?: PackageJson, options?: GenerateConfigOptions): (string | RegExp)[];
