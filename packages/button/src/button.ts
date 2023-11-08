import { InferVueDefaults } from '@sui/utils/src/types/InferVueDefault';
import type Button from './button.vue';

export interface ButtonProps {
  type: '' | 'primary' | 'success' | 'warning' | 'danger';
  plain?: boolean;
  disabled?: boolean;
}

export function defaultButtonProps(): Required<InferVueDefaults<ButtonProps>> {
  return {
    type: '',
    plain: false,
    disabled: false,
  };
}

export type ButtonInstance = InstanceType<typeof Button>;
