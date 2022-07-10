import { Button } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'umi';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

import IconInfo from 'antd-management-fast-framework/es/customComponents/IconInfo';
import { iconCollection } from 'antd-management-fast-framework/es/utils/constants';

import { defaultSettings } from '@/defaultSettings';

import { signInAction } from './Assist/action';

@connect(({ entrance, global }) => ({
  entrance,
  global,
}))
class Entrance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        type: 'account',
        processing: false,
      },
    };
  }

  signIn = (values) => {
    const that = this;

    that.setState({ processing: true });

    signInAction({
      target: this,
      handleData: values,
      successCallback: () => {
        that.setState({
          processing: false,
        });
      },
    });
  };

  render() {
    const { type: loginType, processing } = this.state;

    return (
      <LoginForm
        logo={<img alt="logo" src={defaultSettings.getShareLogo()} />}
        title={defaultSettings.getAppName() || '未设置名称'}
        subTitle={defaultSettings.getAppDescription() || ''}
        initialValues={{
          autoLogin: true,
        }}
        submitter={!processing}
        onFinish={(values) => {
          this.signIn(values);
        }}
      >
        {loginType === 'account' && (
          <>
            <ProFormText
              name="name"
              fieldProps={{
                size: 'large',
                prefix: iconCollection.user,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />

            <ProFormText.Password
              name="psw"
              fieldProps={{
                size: 'large',
                prefix: iconCollection.lock,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}

        {processing ? (
          <Button block type="primary" size="large" disabled>
            <IconInfo icon={iconCollection.loading} text="登陆中" />
          </Button>
        ) : null}
      </LoginForm>
    );
  }
}

export default Entrance;
