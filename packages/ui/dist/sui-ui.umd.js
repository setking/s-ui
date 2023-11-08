(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("@sui/button"), require("@sui/utils"), require("@sui/styles"), require("@sui/config-provider"), require("@sui/input")) : typeof define === "function" && define.amd ? define(["exports", "@sui/button", "@sui/utils", "@sui/styles", "@sui/config-provider", "@sui/input"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiui = {}, global.button, global.utils, global.styles, global.configProvider, global.input));
})(this, function(exports2, button, utils, styles, configProvider, input) {
  "use strict";
  Object.keys(button).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => button[k]
      });
  });
  Object.keys(utils).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => utils[k]
      });
  });
  Object.keys(styles).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => styles[k]
      });
  });
  Object.keys(configProvider).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => configProvider[k]
      });
  });
  Object.keys(input).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => input[k]
      });
  });
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
