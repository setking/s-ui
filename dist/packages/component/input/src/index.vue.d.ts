declare const _default: import("vue").DefineComponent<{
    modeVal: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modeVal": (val: string) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modeVal: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    "onUpdate:modeVal"?: ((val: string) => any) | undefined;
}, {
    modeVal: string;
}, {}>;
export default _default;
