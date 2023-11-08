import { mergeConfig, UserConfig } from 'vite';
import { PackageJson } from 'type-fest';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { readJsonFile, absCwd } from '../utils';
import { getOptions, GenerateConfigOptions } from './options';
import { getPlugin } from './plugins';
import { getExternal } from './external';
import { getLib } from './lib';
/**
 * 生成Vite构建配置
 * @param customOptions 自定义构建项
 * @param viteConfig 自定义vite配置
 */
export async function generateConfig(
  customOptions?: GenerateConfigOptions,
  viteConfig?: UserConfig,
) {
  // 获取配置项
  const options = getOptions(customOptions);

  // 获取每个子包的package.json对象
  const packageJson = await readJsonFile<PackageJson>(absCwd('package.json'));

  // 生成产物相关build.lib
  const libOptions = getLib(packageJson, options);

  // 生成依赖外部化相关配置build.rollupOptions.external
  const external = getExternal(packageJson, options);

  // 插件相关，获取构建配置的plugins字段
  const plugins = getPlugin(packageJson, options);
  // 拼接配置
  const result: UserConfig = {
    plugins,
    build: {
      ...libOptions,
      rollupOptions: {
        external,
        plugins: [
          nodePolyfills(),
        ],
      },
    },
  };
  // 合并模块到自定义vite模块，生成最终配置
  return mergeConfig(result, viteConfig || {} as UserConfig);
}
// 导出其他模块
export * from './plugins';
export * from './options';
export * from './lib';
export * from './external';
export * from './pluginMoveDts';
export * from './pluginSetPackageJson';
