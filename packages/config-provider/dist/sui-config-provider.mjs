import { defineComponent, mergeDefaults, computed, openBlock, createBlock, resolveDynamicComponent, normalizeStyle, withCtx, renderSlot } from "vue";
import { generateCssVars, themeColorLevelsEnabledKeys } from "@sui/styles";
function defaultConfigProviderProps() {
  return {
    tag: "div",
    themeVars: () => ({})
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "config-provider",
  props: mergeDefaults({
    tag: {},
    themeVars: {}
  }, defaultConfigProviderProps()),
  setup(__props) {
    const props = __props;
    const cssVars = computed(() => generateCssVars(props.themeVars, {
      colorLevelsEnabledKeys: themeColorLevelsEnabledKeys,
      colorLevels: 9
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        style: normalizeStyle(cssVars.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});
export {
  _sfc_main as ConfigProvider,
  defaultConfigProviderProps
};
