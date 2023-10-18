(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("lodash")) : typeof define === "function" && define.amd ? define(["exports", "vue", "lodash"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiUi = {}, global.vue, global.lodash));
})(this, function(exports2, vue, lodash) {
  "use strict";
  function hello(to = "World") {
    const txt = `Hello ${to}`;
    alert(txt);
    return txt;
  }
  function useLodash() {
    return lodash;
  }
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      text: { default: "World" }
    },
    setup(__props) {
      const props = __props;
      function clickHandler() {
        hello(props.text);
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
        hello(value);
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
  exports2.Button = _sfc_main$1;
  exports2.Input = _sfc_main;
  exports2.hello = hello;
  exports2.useLodash = useLodash;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
