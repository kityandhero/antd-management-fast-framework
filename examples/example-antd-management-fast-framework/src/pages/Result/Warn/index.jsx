import { Button } from 'antd';

import { connect } from 'easy-soft-dva';

import { Result } from 'antd-management-fast-component';
import { AuthorizationWrapper } from 'antd-management-fast-framework';

const { Warn } = Result;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class Index extends AuthorizationWrapper {
  loadRemoteRequestAfterMount = false;

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    return (
      <Warn
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    );
  }
}

export default Index;
