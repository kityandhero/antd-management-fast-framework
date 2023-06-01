import { Button } from 'antd';

import { connect } from 'easy-soft-dva';

import { Result } from 'antd-management-fast-component';
import { AuthorizationWrapper } from 'antd-management-fast-framework';

const { ServerError } = Result;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class Index extends AuthorizationWrapper {
  loadRemoteRequestAfterMount = false;

  renderFurther() {
    return (
      <ServerError
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
}

export default Index;
