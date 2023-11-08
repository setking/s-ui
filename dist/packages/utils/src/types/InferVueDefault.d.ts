type NativeType = null | number | string | boolean | symbol | Function;
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);
export type InferVueDefaults<T> = {
    [K in keyof T]?: InferDefault<T, T[K]>;
};
export {};
