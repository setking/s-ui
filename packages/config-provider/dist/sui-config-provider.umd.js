(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@sui/styles")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@sui/styles"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.suiconfigprovider = {}, global.vue, global.styles));
})(this, function(exports2, vue, styles) {
  "use strict";
  function defaultConfigProviderProps() {
    return {
      tag: "div",
      themeVars: () => ({})
    };
  }
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "config-provider",
    props: vue.mergeDefaults({
      tag: {},
      themeVars: {}
    }, defaultConfigProviderProps()),
    setup(__props) {
      const props = __props;
      const cssVars = vue.computed(() => styles.generateCssVars(props.themeVars, {
        colorLevelsEnabledKeys: styles.themeColorLevelsEnabledKeys,
        colorLevels: 9
      }));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
          style: vue.normalizeStyle(cssVars.value)
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["style"]);
      };
    }
  });
  exports2.ConfigProvider = _sfc_main;
  exports2.defaultConfigProviderProps = defaultConfigProviderProps;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
