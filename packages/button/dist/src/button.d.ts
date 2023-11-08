import { InferVueDefaults } from '@sui/utils/src/types/InferVueDefault';
import type Button from './button.vue';
export interface ButtonProps {
    type: '' | 'primary' | 'success' | 'warning' | 'danger';
    plain?: boolean;
    disabled?: boolean;
}
export declare function defaultButtonProps(): Required<InferVueDefaults<ButtonProps>>;
export type ButtonInstance = InstanceType<typeof Button>;
