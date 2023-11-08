export interface GenerateIconifyOptions {
    /** svg 图标所在的目录 */
    iconsDir?: string;
    /** iconify 前缀 */
    prefix?: string;
    /** 生成的图标 css 文件的路径，为空代表不生成 css 文件 */
    cssOutput?: string;
    /** css icon 样式选择器的生成规则 */
    cssIconSelector?: string;
    /** css icon 基础样式选择器的生成规则 */
    cssCommonSelector?: string;
    /** 生成的 iconify 规范的 json 文件的路径 */
    jsonOutput?: string;
}
/** 指定一系列 svg 图标，生成 iconify 规范的 json 文件以及对应的图标 css 文件 */
export declare function generateIconify(options?: GenerateIconifyOptions): Promise<void>;
