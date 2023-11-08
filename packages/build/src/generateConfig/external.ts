import { PackageJson } from 'type-fest';
import { getOptions, GenerateConfigOptions } from './options';

/**
 * 获取 build.rollupOptions.external 依赖外部化相关的配置
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */

export function getExternal(
  packageJson: PackageJson = {},
  options: GenerateConfigOptions = {},
) {
  const { dependencies = {}, peerDependencies = {} } = packageJson;

  const { mode } = getOptions(options);
  const defaultExternal: (string | RegExp)[] = [
    /^node:.*/,
  ];
  const toReg = (item:string) => new RegExp(`^${item}`);
  return defaultExternal.concat(
    Object.keys(peerDependencies).map(toReg),
    mode === 'package' ? Object.keys(dependencies).map(toReg) : [],
  );
}
