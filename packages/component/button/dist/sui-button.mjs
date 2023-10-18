import { defineComponent, openBlock, createElementBlock, renderSlot } from "vue";
import { hello } from "@sui/utils";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
export {
  _sfc_main as Button
};
