/** 基础颜色主题变量 */
export declare const themeColors: {
    'color-primary': string;
    'color-success': string;
    'color-warning': string;
    'color-danger': string;
    'color-info': string;
    'color-transparent': string;
    'color-black': string;
    'color-white': string;
    'color-page': string;
    'color-card': string;
    'color-header': string;
    'color-regular': string;
    'color-secondary': string;
    'color-placeholder': string;
    'color-disabled': string;
    'color-reverse': string;
    'color-bd_darker': string;
    'color-bd_dark': string;
    'color-bd_base': string;
    'color-bd_light': string;
    'color-bd_lighter': string;
    'color-bd_lightest': string;
};
/**
 * 需要生成色阶的颜色
 *
 * 例如 color-primary 将会生成 color-primary-light-[1-9] 以及 color-primary-dark-[1-9] 系列浅色与深色的变量。
 */
export declare const themeColorLevelsEnabledKeys: (keyof typeof themeColors)[];
/** 基础边距主题变量 */
export declare const themeSpacing: {
    'spacing-xs': string;
    'spacing-sm': string;
    'spacing-md': string;
    'spacing-lg': string;
    'spacing-xl': string;
};
/** 基础主题变量 */
export declare const themeVars: {
    'spacing-xs': string;
    'spacing-sm': string;
    'spacing-md': string;
    'spacing-lg': string;
    'spacing-xl': string;
    'color-primary': string;
    'color-success': string;
    'color-warning': string;
    'color-danger': string;
    'color-info': string;
    'color-transparent': string;
    'color-black': string;
    'color-white': string;
    'color-page': string;
    'color-card': string;
    'color-header': string;
    'color-regular': string;
    'color-secondary': string;
    'color-placeholder': string;
    'color-disabled': string;
    'color-reverse': string;
    'color-bd_darker': string;
    'color-bd_dark': string;
    'color-bd_base': string;
    'color-bd_light': string;
    'color-bd_lighter': string;
    'color-bd_lightest': string;
};
/** 基础主题变量类型 */
export type ThemeCssVarsConfig = Partial<typeof themeVars>;
