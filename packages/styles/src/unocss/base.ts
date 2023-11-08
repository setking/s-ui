import { UserConfig } from 'unocss';
import { Theme } from 'unocss/preset-mini';

import {
  themeColors,
  themeColorLevelsEnabledKeys,
  themeSpacing,
} from '../vars';
import { toTheme } from '../utils';

export const baseConfig: UserConfig<Theme> = {
  theme: {
    colors: toTheme(themeColors, {
      type: 'color',
      colorLevelsEnabledKeys: themeColorLevelsEnabledKeys,
      colorLevels: 9,
    }),
    spacing: toTheme(themeSpacing, { type: 'spacing' }),
  },
};
