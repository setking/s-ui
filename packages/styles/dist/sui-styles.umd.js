(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@sui/utils")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@sui/utils"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suistyles = {}, global.vue, global.utils));
})(this, function(exports2, vue, utils) {
  "use strict";
  const __uno = "";
  const themeColors = {
    "color-primary": "#c7000b",
    "color-success": "#50d4ab",
    "color-warning": "#fbb175",
    "color-danger": "#f66f6a",
    "color-info": "#526ecc",
    "color-transparent": "transparent",
    "color-black": "#000",
    "color-white": "#fff",
    // 背景色
    "color-page": "#f5f5f6",
    "color-card": "#fff",
    // 文字主色
    "color-header": "#252b3a",
    "color-regular": "#575d6c",
    "color-secondary": "#8a8e99",
    "color-placeholder": "#abb0b8",
    "color-disabled": "#c0c4cc",
    "color-reverse": "#fff",
    // 边框主色
    "color-bd_darker": "#cdd0d6",
    "color-bd_dark": "#d4d7de",
    "color-bd_base": "#dcdfe6",
    "color-bd_light": "#dfe1e6",
    "color-bd_lighter": "#ebeff5",
    "color-bd_lightest": "#f2f6fc"
  };
  const themeColorLevelsEnabledKeys = [
    "color-primary",
    "color-success",
    "color-warning",
    "color-danger",
    "color-info"
  ];
  const themeSpacing = {
    "spacing-xs": "8px",
    "spacing-sm": "12px",
    "spacing-md": "16px",
    "spacing-lg": "24px",
    "spacing-xl": "32px"
  };
  const themeVars = {
    ...themeColors,
    ...themeSpacing
  };
  function toRgba(str) {
    return hexToRgba(str) || // eslint-disable-next-line @typescript-eslint/no-use-before-define
    parseCssFunc(str);
  }
  function hexToRgba(str) {
    if (str.charAt(0) !== "#") {
      return null;
    }
    if (str.length !== 4 && str.length !== 7) {
      return null;
    }
    let colorStr = str.slice(1);
    if (colorStr.length === 3) {
      colorStr = colorStr[0] + colorStr[0] + colorStr[1] + colorStr[1] + colorStr[2] + colorStr[2];
    }
    const r = parseInt(colorStr.slice(0, 2), 16);
    const g = parseInt(colorStr.slice(2, 4), 16);
    const b = parseInt(colorStr.slice(4, 6), 16);
    return createRgbaColor(r, g, b, 1);
  }
  const cssColorFunctions = ["rgb", "rgba"];
  function parseCssFunc(str) {
    const match = str.match(/^(.*)\((.+)\)$/i);
    if (!match) {
      return null;
    }
    const [, func, argsTxt] = match;
    if (!cssColorFunctions.includes(func)) {
      return null;
    }
    let argsArr = argsTxt.split(",");
    if (argsArr.length === 1) {
      argsArr = argsTxt.split(" ");
    }
    const args = argsArr.map(parseFloat).filter((item) => item);
    if (func === "rgb" || func === "rgba") {
      const [r, g, b, a] = args;
      return createRgbaColor(r, g, b, a || 1);
    }
    return null;
  }
  function createRgbaColor(r, g, b, a = 1) {
    return {
      args: [r, g, b, a],
      get rgbTxt() {
        const [rr, gg, bb] = this.args;
        return `${rr}, ${gg}, ${bb}`;
      },
      get rgba() {
        return `rgba(${this.rgbTxt}, ${this.args[3] || 1})`;
      }
    };
  }
  function mixRgbColor(source, target, percent) {
    const res = [
      source.args[0] + (target.args[0] - source.args[0]) * (percent / 100),
      source.args[1] + (target.args[1] - source.args[1]) * (percent / 100),
      source.args[2] + (target.args[2] - source.args[2]) * (percent / 100)
    ].map((item) => Math.round(item));
    const [rr, gg, bb] = res;
    return createRgbaColor(rr, gg, bb, source.args[3] || 1);
  }
  function generateRgbColorLevels(color, levels = 9) {
    const result = {
      light: [],
      dark: []
    };
    if (color.rgbTxt === "0, 0, 0" || color.rgbTxt === "255, 255, 255") {
      return result;
    }
    const percent = 100 / (levels + 1);
    for (let i = 1; i < levels + 1; i++) {
      result.light.push(
        mixRgbColor(color, createRgbaColor(255, 255, 255), i * percent)
      );
      result.dark.push(
        mixRgbColor(color, createRgbaColor(0, 0, 0), i * percent)
      );
    }
    return result;
  }
  const DEFAULT_PREFIX = "op-";
  function generateCssVars(origin, options) {
    const {
      prefix = DEFAULT_PREFIX,
      colorLevelsEnabledKeys = [],
      colorLevels = 9
    } = options || {};
    const result = {};
    Object.entries(origin).forEach(([key, value]) => {
      const cssKey = `--${prefix}${key}`;
      const valueToRgba = toRgba(value);
      const finalValue = valueToRgba ? valueToRgba.rgbTxt : value;
      result[cssKey] = finalValue;
      if (valueToRgba && colorLevelsEnabledKeys.includes(key)) {
        const rgbLevels = generateRgbColorLevels(valueToRgba, colorLevels);
        rgbLevels.light.forEach((light, index) => {
          const dark = rgbLevels.dark[index];
          result[`${cssKey}-light-${index + 1}`] = light.rgbTxt;
          result[`${cssKey}-dark-${index + 1}`] = dark.rgbTxt;
        });
      }
    });
    return result;
  }
  function cssVarsToString(cssVars, selector = ":root") {
    let result = `${selector}{`;
    Object.entries(cssVars).forEach(([key, value]) => {
      result += `${key}: ${value};`;
    });
    result += "}";
    return result;
  }
  function getCssVar(name, prefix = DEFAULT_PREFIX) {
    return `var(--${prefix}${name})`;
  }
  function cssVarToRgba(name, alpha = 1, prefix = DEFAULT_PREFIX) {
    return `rgba(${getCssVar(name, prefix)},${alpha})`;
  }
  function toTheme(origin, options) {
    const {
      type = "color",
      prefix = DEFAULT_PREFIX,
      colorLevelsEnabledKeys = [],
      colorLevels = 9
    } = options || {};
    const themeReg = new RegExp(`^${type}-(.*)$`);
    const keys = Object.keys(origin).filter((key) => themeReg.test(key)).map((key) => key.replace(themeReg, "$1"));
    const result = {};
    keys.forEach((key) => {
      result[key] = `rgb(${getCssVar(`${type}-${key}`, prefix)})`;
      if (type === "color" && colorLevelsEnabledKeys.includes(`${type}-${key}`)) {
        const lightColors = {};
        const darkColors = {};
        for (let i = 1; i < colorLevels + 1; i++) {
          lightColors[`${i}`] = `rgb(${getCssVar(`${type}-${key}-light-${i}`, prefix)})`;
          darkColors[`${i}`] = `rgb(${getCssVar(`${type}-${key}-dark-${i}`, prefix)})`;
        }
        result[`${key}_light`] = lightColors;
        result[`${key}_dark`] = darkColors;
      }
    });
    return result;
  }
  const buttonVars = {
    "button-color": cssVarToRgba("color-regular"),
    "button-bg-color": cssVarToRgba("color-card"),
    "button-border-color": cssVarToRgba("color-bd_base"),
    "button-hover-color": cssVarToRgba("color-primary"),
    "button-hover-bg-color": cssVarToRgba("color-primary-light-9"),
    "button-hover-border-color": cssVarToRgba("color-primary-light-7"),
    "button-active-color": cssVarToRgba("color-primary"),
    "button-active-bg-color": cssVarToRgba("color-primary-light-9"),
    "button-active-border-color": cssVarToRgba("color-primary"),
    "button-disabled-color": cssVarToRgba("color-placeholder"),
    "button-disabled-bg-color": cssVarToRgba("color-card"),
    "button-disabled-border-color": cssVarToRgba("color-bd_light"),
    "button-padding-x": getCssVar("spacing-md"),
    "button-padding-y": getCssVar("spacing-xs")
  };
  const inputVars = {
    "input-color": cssVarToRgba("color-regular"),
    "input-bg-color": cssVarToRgba("color-card"),
    "input-border-color": cssVarToRgba("color-bd_base"),
    "input-hover-color": cssVarToRgba("color-primary"),
    "input-hover-bg-color": cssVarToRgba("color-primary-light-9"),
    "input-hover-border-color": cssVarToRgba("color-primary-light-7"),
    "input-active-color": cssVarToRgba("color-primary"),
    "input-active-bg-color": cssVarToRgba("color-primary-light-9"),
    "input-active-border-color": cssVarToRgba("color-primary"),
    "input-disabled-color": cssVarToRgba("color-placeholder"),
    "input-disabled-bg-color": cssVarToRgba("color-card"),
    "input-disabled-border-color": cssVarToRgba("color-bd_light"),
    "input-padding-x": getCssVar("spacing-md"),
    "input-padding-y": getCssVar("spacing-xs")
  };
  const tinyThemeVars = {
    "color-primary": "#5e7ce0",
    "color-success": "#50d4ab",
    "color-warning": "#fa9841",
    "color-error": "#c7000b",
    "color-info": "#252b3a"
  };
  const THEME_PROVIDE_KEY = "__SUITheme__";
  function useGlobalTheme(app, options) {
    function setTheme(styleObj) {
      const cssVars = generateCssVars(styleObj, {
        colorLevelsEnabledKeys: themeColorLevelsEnabledKeys,
        colorLevels: 9
      });
      Object.entries(cssVars).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v);
      });
    }
    const result = { setTheme };
    app.provide(THEME_PROVIDE_KEY, result);
    if (utils.isObjectLike(options) && Object.keys(options).length > 0) {
      setTheme(options);
    }
    return result;
  }
  function useTheme() {
    const result = vue.inject(THEME_PROVIDE_KEY);
    if (!result) {
      throw new Error("useTheme() must be used after app.use(Theme)!");
    }
    return result;
  }
  const Theme = {
    install: (app, ...options) => {
      const finalOptions = {};
      options.forEach((item) => {
        Object.assign(finalOptions, item);
      });
      useGlobalTheme(app, finalOptions);
    }
  };
  exports2.DEFAULT_PREFIX = DEFAULT_PREFIX;
  exports2.Theme = Theme;
  exports2.buttonVars = buttonVars;
  exports2.cssVarToRgba = cssVarToRgba;
  exports2.cssVarsToString = cssVarsToString;
  exports2.generateCssVars = generateCssVars;
  exports2.generateRgbColorLevels = generateRgbColorLevels;
  exports2.getCssVar = getCssVar;
  exports2.inputVars = inputVars;
  exports2.mixRgbColor = mixRgbColor;
  exports2.themeColorLevelsEnabledKeys = themeColorLevelsEnabledKeys;
  exports2.themeColors = themeColors;
  exports2.themeSpacing = themeSpacing;
  exports2.themeVars = themeVars;
  exports2.tinyThemeVars = tinyThemeVars;
  exports2.toRgba = toRgba;
  exports2.toTheme = toTheme;
  exports2.useTheme = useTheme;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
