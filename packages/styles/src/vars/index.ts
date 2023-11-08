import { ThemeCssVarsConfig } from './theme';
import { ButtonCssVarsConfig } from './button';
import { InputCssVarsConfig } from './input';

// eslint-disable-next-line max-len
export interface SuiCssVarConfig extends ThemeCssVarsConfig, ButtonCssVarsConfig, InputCssVarsConfig {
  [key: string]: string | undefined;
}

export * from './theme';
export * from './button';
export * from './input';
