import { Component } from 'vue';
import { SuiCssVarConfig } from '@sui/styles';
import { InferVueDefaults } from '@sui/utils';
import type ConfigProvider from './config-provider.vue';
export interface ConfigProviderProps {
    /** 组件的节点将被渲染的标签类型 */
    tag?: string | Component;
    /** 应用在该节点上的主题变量 */
    themeVars?: SuiCssVarConfig;
}
export declare function defaultConfigProviderProps(): Required<InferVueDefaults<ConfigProviderProps>>;
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>;
