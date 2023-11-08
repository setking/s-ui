/** RGBA 颜色对象 */
interface RGBAColor {
    /** r、g、b、a 值 */
    args: [number, number, number, number];
    /** 获取 rgb 值，例如：255,255,255 */
    get rgbTxt(): string;
    /** 获取 rgba 完整表示，例如：rgba(255,255,255,1) */
    get rgba(): string;
}
/** 给与一个 CSS 表达式，试图将其转化为 RGBA 颜色对象 */
export declare function toRgba(str: string): RGBAColor | null;
/**
 * 颜色混合
 * @param source 起始色
 * @param target 目标色
 * @param percent 混合比例百分比
 * @returns 混合后的颜色
 */
export declare function mixRgbColor(source: RGBAColor, target: RGBAColor, percent: number): RGBAColor;
/**
 * 生成色阶对象。light 系列与白色一步步混合，dark 系列与黑色一步步混合。
 * @param color 基准颜色
 * @param levels 色阶数
 * @returns 色阶对象
 */
export declare function generateRgbColorLevels(color: RGBAColor, levels?: number): {
    light: RGBAColor[];
    dark: RGBAColor[];
};
export {};
