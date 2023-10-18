(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@sui/utils")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@sui/utils"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiButton = {}, global.vue, global.utils));
})(this, function(exports2, vue, utils) {
  "use strict";
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      text: { default: "World" }
    },
    setup(__props) {
      const props = __props;
      function clickHandler() {
        utils.hello(props.text);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          class: "open-button",
          onClick: clickHandler
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ]);
      };
    }
  });
  exports2.Button = _sfc_main;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
