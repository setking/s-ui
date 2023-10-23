import { defineComponent, openBlock, createElementBlock, renderSlot } from "vue";
import lodash from "lodash";
function hello(to = "World") {
  const txt = `Hello ${to}`;
  console.log(txt);
  return txt;
}
function useLodash() {
  return lodash;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("button", {
        class: "open-button",
        onClick: clickHandler
      }, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
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
  _sfc_main$1 as Button,
  _sfc_main as Input,
  hello,
  useLodash
};
