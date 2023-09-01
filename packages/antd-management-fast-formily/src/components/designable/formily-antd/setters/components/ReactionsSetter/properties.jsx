import {
  AnyHelper,
  BooleanHelper,
  ComponentPropertiesHelper,
  DataSourceHelper,
  DecoratorPropertiesHelper,
  DisplayHelper,
  PatternHelper,
  StringHelper,
} from './helpers';

export const FieldProperties = [
  {
    key: 'visible',
    type: 'boolean',
    helpCode: BooleanHelper,
  },
  { key: 'hidden', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'display',
    type: '"visible" | "hidden" | "none"',
    helpCode: DisplayHelper,
  },
  {
    key: 'pattern',
    type: '"editable" | "disabled" | "readOnly" | "readPretty"',
    helpCode: PatternHelper,
  },
  { key: 'title', type: 'string', helpCode: StringHelper },
  { key: 'description', type: 'string', helpCode: StringHelper },
  { key: 'value', type: 'any', helpCode: AnyHelper },
  { key: 'initialValue', type: 'any', helpCode: AnyHelper },
  { key: 'required', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'dataSource',
    type: 'Array<{label?:string,value?:any}>',
    helpCode: DataSourceHelper,
  },
  {
    key: 'componentProps',
    token: 'componentProps',
    type: 'object',
    helpCode: ComponentPropertiesHelper,
  },
  {
    key: 'decoratorProps',
    token: 'decoratorProps',
    type: 'object',
    helpCode: DecoratorPropertiesHelper,
  },
];
