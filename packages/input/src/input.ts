import { InferVueDefaults } from '@sui/utils/src/types/InferVueDefault';
import type Input from './input.vue';

export interface InputProps {
  type: '' | 'primary' | 'success' | 'warning' | 'danger';
  plain?: boolean;
  disabled?: boolean;
  modelValue?: string
}

export function defaultInputProps(): Required<InferVueDefaults<InputProps>> {
  return {
    type: '',
    plain: false,
    disabled: false,
    modelValue: '',
  };
}

export type ButtonInstance = InstanceType<typeof Input>;
