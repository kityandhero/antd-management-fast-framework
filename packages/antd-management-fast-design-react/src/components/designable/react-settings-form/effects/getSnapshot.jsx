import { onFieldInputValueChange } from '@formily/core';

let timeRequest = null;

export const getSnapshot = (operation) => {
  onFieldInputValueChange('*', () => {
    clearTimeout(timeRequest);

    timeRequest = setTimeout(() => {
      operation.snapshot('update:node:props');
    }, 1000);
  });
};
