import { Preset, UserConfig } from 'unocss';
import { Theme } from 'unocss/preset-mini';
declare const configMaps: {
    theme: UserConfig<Theme>;
    button: UserConfig<object>;
};
type ConfigKeys = keyof typeof configMaps;
export interface SuiPresetOptions {
    include?: ConfigKeys[];
    exclude?: ConfigKeys[];
}
export declare function suiPreset(options?: SuiPresetOptions): Preset;
export {};
