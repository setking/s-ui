import { UserConfig } from 'unocss';
import { buttonVars } from '../../vars';
import { cssVarsToString, generateCssVars } from '../../utils';

export const buttonConfig: UserConfig = {
  // rules: buttonRules,
  // shortcuts: buttonShortcuts,
  // safelist: [
  //   ...toSafeList(buttonRules),
  //   ...toSafeList(buttonShortcuts),
  // ],
  preflights: [
    {
      getCSS: () => cssVarsToString(
        generateCssVars(buttonVars),
      ),
    },
  ],
};
