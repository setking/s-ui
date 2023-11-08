import { PackageJson } from 'type-fest';
import { LibraryFormats, BuildOptions } from 'vite';
import { GenerateConfigOptions } from './options';
/**
 * 获取 build.lib 产物相关配置
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export declare function getLib(packageJson?: PackageJson, options?: GenerateConfigOptions): Pick<BuildOptions, 'lib' | 'minify' | 'sourcemap' | 'outDir' | 'emptyOutDir'>;
/**
 * 获取产物文件名称
 * @param fileName 文件名称
 * @param format 产物格式
 * @param buildMode 构建模式
 */
export declare function getOutFileName(fileName: string, format: LibraryFormats, buildMode: GenerateConfigOptions['mode']): string;
interface EntryInfo {
    /** 子包源码入口文件的绝对路径 */
    abs: string;
    /** 子包源码入口文件相对于脚本执行位置的路径 */
    rel: string;
    /** 子包源码入口是不是文件 */
    isFile: boolean;
}
/**
 * 解析子包源码入口
 * @param entry 源码入口路径
 * @returns 子包源码入口信息，解析结果
 */
export declare function resolveEntry(entry: string): EntryInfo;
export {};
