import { Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { connect } from 'easy-soft-dva';

import { AnchorLink, Result } from 'antd-management-fast-component';
import { AuthorizationWrapper } from 'antd-management-fast-framework';

const { Paragraph, Text } = Typography;
const { LocalError } = Result;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class Index extends AuthorizationWrapper {
  loadRemoteRequestAfterMount = false;

  renderFurther() {
    return (
      <LocalError
        subTitle="Something Error."
        extra={<Button type="primary">Back Home</Button>}
        content={
          <>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined />
              Your account has been frozen.{' '}
              <AnchorLink>Thaw immediately &gt;</AnchorLink>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined />
              Your account is not yet eligible to apply.
              <AnchorLink>Apply Unlock &gt;</AnchorLink>
            </Paragraph>
          </>
        }
      />
    );
  }
}

export default Index;
