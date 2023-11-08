import { UserConfig } from 'unocss';
import { Theme } from 'unocss/preset-mini';
import { themeVars, themeColorLevelsEnabledKeys } from '../vars';
import { generateCssVars, cssVarsToString } from '../utils';

export const themeConfig: UserConfig<Theme> = {
  preflights: [
    {
      getCSS: () => cssVarsToString(
        generateCssVars(themeVars, {
          colorLevelsEnabledKeys: themeColorLevelsEnabledKeys,
          colorLevels: 9,
        }),
      ),
    },
  ],
};
