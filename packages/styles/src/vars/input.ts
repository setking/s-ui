import { getCssVar, cssVarToRgba } from '../utils';
import { ThemeCssVarsConfig } from './theme';

export const inputVars = {
  'input-color': cssVarToRgba<ThemeCssVarsConfig>('color-regular'),
  'input-bg-color': cssVarToRgba<ThemeCssVarsConfig>('color-card'),
  'input-border-color': cssVarToRgba<ThemeCssVarsConfig>('color-bd_base'),
  'input-hover-color': cssVarToRgba<ThemeCssVarsConfig>('color-primary'),
  'input-hover-bg-color': cssVarToRgba('color-primary-light-9'),
  'input-hover-border-color': cssVarToRgba('color-primary-light-7'),
  'input-active-color': cssVarToRgba<ThemeCssVarsConfig>('color-primary'),
  'input-active-bg-color': cssVarToRgba('color-primary-light-9'),
  'input-active-border-color': cssVarToRgba<ThemeCssVarsConfig>('color-primary'),
  'input-disabled-color': cssVarToRgba<ThemeCssVarsConfig>('color-placeholder'),
  'input-disabled-bg-color': cssVarToRgba<ThemeCssVarsConfig>('color-card'),
  'input-disabled-border-color': cssVarToRgba<ThemeCssVarsConfig>('color-bd_light'),
  'input-padding-x': getCssVar<ThemeCssVarsConfig>('spacing-md'),
  'input-padding-y': getCssVar<ThemeCssVarsConfig>('spacing-xs'),
};

export type InputCssVarsConfig = Partial<typeof inputVars>;
