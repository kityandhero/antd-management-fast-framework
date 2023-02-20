import { AbstractComponent } from '../AbstractComponent';

const defaultProps = {};

class BaseComponent extends AbstractComponent {
  getDispatch = () => {
    const { dispatch } = this.props;

    if ((dispatch || null) == null) {
      throw new Error(
        'dispatch is null, please set dispatch in props or override getDispatch,if use dva, please connect a model ',
      );
    }

    return dispatch;
  };

  // eslint-disable-next-line no-unused-vars
  adjustShowRenderCountInConsole = (nextProperties, nextState) => {
    const { showRenderCount } = nextProperties;

    this.showRenderCountInConsole = !!showRenderCount || false;
  };
}

BaseComponent.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BaseComponent };
