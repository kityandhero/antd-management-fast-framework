import { Button } from 'antd';
import React from 'react';
// eslint-disable-next-line import/named
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { connect } from '@umijs/max';

import { redirectTo, setAuthority } from 'easy-soft-utility';

import {
  getAppDescription,
  getAppName,
  getPageQuery,
  getShareLogo,
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
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      type: 'account',
      processing: false,
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

            const urlParameters = new URL(window.location.href);
            const parameters = getPageQuery();
            let { redirect } = parameters;

            if (redirect) {
              const redirectUrlParameters = new URL(redirect);

              if (redirectUrlParameters.origin === urlParameters.origin) {
                redirect = redirect.slice(urlParameters.origin.length);

                if (/^\/.*#/.test(redirect)) {
                  redirect = redirect.slice(redirect.indexOf('#') + 1);
                }
              } else {
                window.location.href = '/';
                return;
              }
            }

            redirectTo(redirect || '/');
          },
        );
      },
    });
  };

  renderFurther() {
    const { type: loginType, processing } = this.state;

    return (
      <LoginForm
        logo={<img alt="logo" src={getShareLogo()} />}
        title={getAppName() || '未设置名称'}
        subTitle={getAppDescription() || ''}
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
