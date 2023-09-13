export const FileUpload = {
  type: 'object',
  properties: {
    textContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    accept: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    action: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['TEXT', 'EXPRESSION'],
      },
    },
  },
};
