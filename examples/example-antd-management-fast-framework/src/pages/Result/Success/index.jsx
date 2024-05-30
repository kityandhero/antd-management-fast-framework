import { Button } from 'antd';

import { connect } from 'easy-soft-dva';

import { Result } from 'antd-management-fast-component';
import { AuthorizationWrapper } from 'antd-management-fast-framework';

const { Success } = Result;

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
      <Success
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    );
  }
}

export default Index;
