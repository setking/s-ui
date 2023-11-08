import { Plugin } from 'vue';
import { SuiCssVarConfig } from '../vars';
export declare function useTheme(): {
    setTheme: (styleObj: SuiCssVarConfig) => void;
};
export declare const Theme: Plugin<SuiCssVarConfig[]>;
export * from './presets';
