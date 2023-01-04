import { ComponentBase } from 'antd-management-fast-common/es/customComponents';

const defaultProps = {};

class BaseComponent extends ComponentBase {
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
