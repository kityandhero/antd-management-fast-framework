import { Button } from 'antd';

import { connect } from 'easy-soft-dva';
import { redirectTo } from 'easy-soft-utility';

import { Result } from 'antd-management-fast-component';
import { AuthorizationWrapper } from 'antd-management-fast-framework';

const { NotFound } = Result;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class Index extends AuthorizationWrapper {
  loadRemoteRequestAfterMount = false;

  renderFurther() {
    return (
      <NotFound
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              redirectTo({ pathname: '/', withProgress: true });
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }
}

export default Index;
