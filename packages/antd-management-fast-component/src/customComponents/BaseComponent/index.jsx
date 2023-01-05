import { ComponentBase } from 'antd-management-fast-common/es/customComponents';

const defaultProps = {};

class BaseComponent extends ComponentBase {
  getDispatch = () => {
    const { dispatch } = this.props;

    if ((dispatch || null) == null) {
      throw new Error(
        'dispatch is null, please set dispatch in props or override getDispatch,if use dva, please connect a model ',
      );
    }

    return dispatch;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  adjustShowRenderCountInConsole = (nextProps, nextState) => {
    {
      const { showRenderCount } = nextProps;

      this.showRenderCountInConsole = !!showRenderCount || false;
    }
  };
}

BaseComponent.defaultProps = {
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BaseComponent;
