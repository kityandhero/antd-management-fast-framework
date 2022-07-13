import { Button, Result } from 'antd';

import { goToPath } from 'antd-management-fast-framework/es/utils/tools';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => goToPath('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
