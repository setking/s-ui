(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@sui/utils")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@sui/utils"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiInput = {}, global.vue, global.utils));
})(this, function(exports2, vue, utils) {
  "use strict";
  const _hoisted_1 = ["value"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      modeVal: { default: "" }
    },
    emits: ["update:modeVal"],
    setup(__props, { emit }) {
      function inputHandler(e) {
        const value = e.target.value;
        emit("update:modeVal", value);
        utils.hello(value);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("input", {
          type: "text",
          class: "open-input",
          value: _ctx.modeVal,
          onInput: inputHandler
        }, null, 40, _hoisted_1);
      };
    }
  });
  exports2.Input = _sfc_main;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
