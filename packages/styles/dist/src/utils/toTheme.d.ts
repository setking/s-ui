import { DefaultPrefix, GenerateCssVarsOptions } from './cssVars';
/**
 * 主题生成选项
 * @typeParam {@link GenerateCssVarsOptions}
 */
export interface ToThemeOptions<K = string, P extends string = DefaultPrefix> extends GenerateCssVarsOptions<K, P> {
    /** 主题的类别 */
    type?: string;
}
/**
 * 根据主题变量的原始对象，生成 UnoCSS 的 Theme 对象
 * @param origin 原始主题变量对象
 * @param options 选项 {@link ToThemeOptions}
 */
export declare function toTheme<T extends Record<string, any> = Record<string, any>, K extends keyof T = keyof T, P extends string = DefaultPrefix>(origin: T, options?: ToThemeOptions<K, P>): Record<string, any>;
