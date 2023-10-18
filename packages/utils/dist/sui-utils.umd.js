(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("lodash")) : typeof define === "function" && define.amd ? define(["exports", "lodash"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiUtils = {}, global.lodash));
})(this, function(exports2, lodash) {
  "use strict";
  function hello(to = "World") {
    const txt = `Hello ${to}`;
    alert(txt);
    return txt;
  }
  function useLodash() {
    return lodash;
  }
  exports2.hello = hello;
  exports2.useLodash = useLodash;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
