import { Input } from './Input';

export const Password = {
  type: 'object',
  properties: {
    ...Input.properties,
    checkStrength: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};
