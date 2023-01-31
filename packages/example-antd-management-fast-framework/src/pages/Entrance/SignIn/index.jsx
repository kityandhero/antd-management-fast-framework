import { Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

import {
  getPageQuery,
  redirectToPath,
  runtimeSettings,
  setAuthority,
  setToken,
} from 'antd-management-fast-common';
import {
  BaseComponent,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { signInAction } from '../Assist/action';

const defaultProps = {};

@connect(({ entrance, global }) => ({
  entrance,
  global,
}))
class SignIn extends BaseComponent {
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
      successCallback: ({ remoteData }) => {
        that.setState(
          {
            processing: false,
          },
          () => {
            const { currentAuthority, token: tokenValue } = remoteData;

            setAuthority(currentAuthority);
            setToken(tokenValue);

            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let { redirect } = params;

            if (redirect) {
              const redirectUrlParams = new URL(redirect);

              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length);

                if (redirect.match(/^\/.*#/)) {
                  redirect = redirect.substr(redirect.indexOf('#') + 1);
                }
              } else {
                window.location.href = '/';
                return;
              }
            }

            redirectToPath(redirect || '/');
          },
        );
      },
    });
  };

  renderFurther() {
    const { type: loginType, processing } = this.state;

    return (
      <LoginForm
        logo={<img alt="logo" src={runtimeSettings.getShareLogo()} />}
        title={runtimeSettings.getAppName() || '未设置名称'}
        subTitle={runtimeSettings.getAppDescription() || ''}
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
                prefix: iconBuilder.user(),
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
                prefix: iconBuilder.lock(),
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
            <IconInfo icon={iconBuilder.loading()} text="登陆中" />
          </Button>
        ) : null}
      </LoginForm>
    );
  }
}

SignIn.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SignIn;
