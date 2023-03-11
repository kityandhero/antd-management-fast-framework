import { AbstractComponent } from '../AbstractComponent';

const defaultProps = {};

class BaseComponent extends AbstractComponent {}

BaseComponent.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BaseComponent };
