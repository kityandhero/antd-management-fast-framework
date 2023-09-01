import { CSSStyle } from './CascadingStyleSheet';
import { FormLayout } from './FormLayout';

export const Form = {
  type: 'object',
  properties: {
    ...FormLayout.properties,
    style: CSSStyle,
  },
};
