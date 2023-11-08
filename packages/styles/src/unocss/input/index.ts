import { UserConfig } from 'unocss';
import { inputVars } from '../../vars';
import { cssVarsToString, generateCssVars } from '../../utils';

export const inputConfig: UserConfig = {
  // rules: buttonRules,
  // shortcuts: buttonShortcuts,
  // safelist: [
  //   ...toSafeList(buttonRules),
  //   ...toSafeList(buttonShortcuts),
  // ],
  preflights: [
    {
      getCSS: () => cssVarsToString(
        generateCssVars(inputVars),
      ),
    },
  ],
};
