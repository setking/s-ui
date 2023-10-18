import { defineComponent, openBlock, createElementBlock } from "vue";
import { hello } from "@sui/utils";
const _hoisted_1 = ["value"];
const _sfc_main = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("input", {
        type: "text",
        class: "open-input",
        value: _ctx.modeVal,
        onInput: inputHandler
      }, null, 40, _hoisted_1);
    };
  }
});
export {
  _sfc_main as Input
};