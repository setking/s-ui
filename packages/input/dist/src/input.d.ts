import { InferVueDefaults } from '@sui/utils/src/types/InferVueDefault';
import type Input from './input.vue';
export interface InputProps {
    type: '' | 'primary' | 'success' | 'warning' | 'danger';
    plain?: boolean;
    disabled?: boolean;
    modelValue?: string;
}
export declare function defaultInputProps(): Required<InferVueDefaults<InputProps>>;
export type ButtonInstance = InstanceType<typeof Input>;
