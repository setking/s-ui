import { PackageJson } from 'type-fest';
import type { GenerateConfigPluginsOptions } from './plugins';

// 自定义构建选项
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface GenerateConfigOptions extends GenerateConfigPluginsOptions {
  /**
   +  * 是否将构建产物的相对路径回写到 package.json 的 exports 字段对应的 key 中。
   +  *
   +  * 必须在 mode 为 packages 时生效。
   +  *
   +  * 当取值为 '.' 时，还会同步写入 main、module、types 字段
   +  */
  exports?: string;

  /**
     * 代码入口
     * @default 'src/index.ts'
     */
  entry?: string
  /**
     * 产物输出路径
     * @default 'dist'
     */
  outDir?: string
  /**
     * 生成文件的名称
     * 默认取package包转换为kebab-case,如 a/b -> a-b
     *
     * 当产物为umd格式，驼峰化后的fileName会作为全局变量名，如: a-bc -> aBc
     *
     */
  fileName?: string;
  /**
     * 打包模式
     * - package - 常量构建。会将所有依赖外部化处理，打包适用于构建场景的`es`、`umd`格式产物。并在构建结束后将产物路径回写入 package.json 的入口字段中。
     * - full - 全量构建。大部分依赖都不做外部化处理，打包出适用于非构建场景的 `umd` 格式产物。不参与 d.ts 的移动；不参与构建完成后的产物路径回写
     *- full-min - 在全量构建的基础上，将产物代码混淆压缩，并生成 sourcemap 文件。
     *  @default 'package'
     */
  mode?: 'package' | 'full' | 'full-min';
  /**
     * 是否将 d.ts 类型声明文件的产物从集中目录移动到产物目录，并将类型入口回写到 package.json 的 types 字段。
     *
     * 必须在 mode 为 packages 时生效。
     *
     * 输入 tsc 编译生成 d.ts 文件时所读取的 tsconfig 文件的路径。
     * @default ''
     */
  dts?: string;
  /**
     * 完成构建后，准备回写 package.json 文件前对其对象进行更改的钩子。
     *
     * 必须在 mode 为 packages 时生效。
     */
  onSetPkg?: (pkg: PackageJson, options: Required<GenerateConfigOptions>) => void | Promise<void>;
}

/** 构建选项的默认值 */

export function defaultOptions(): Required<GenerateConfigOptions> {
  return {
    entry: 'src/index.ts',
    outDir: 'dist',
    fileName: '',
    exports: '.',
    mode: 'package',
    dts: '',
    onSetPkg: () => {},
    pluginVue: false,
    pluginInspect: false,
    pluginVisualizer: false,
    pluginReplace: false,
  };
}

/** 解构构建选项 */
export function getOptions(options?: GenerateConfigOptions): Required<GenerateConfigOptions> {
  return {
    ...defaultOptions(),
    ...options,
  };
}
