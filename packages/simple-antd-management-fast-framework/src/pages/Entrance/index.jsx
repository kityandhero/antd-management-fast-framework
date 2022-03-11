import React, { useState } from 'react';
import { connect, Link } from 'umi';
import { Alert, Checkbox } from 'antd';
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';

import EntranceFrom from 'antd-management-fast-framework/es/customComponents/Entrance';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = EntranceFrom;

const EntranceMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Entrance = (props) => {
  const { entrance = {}, submitting } = props;
  const { status, type: entranceType } = entrance;
  const [type, setType] = useState('account');
  const [autoSignIn, setAutoSignIn] = useState('account');

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'entrance/signIn',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <EntranceFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <>
          {status === 'error' && entranceType === 'account' && !submitting && (
            <EntranceMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="name"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="psw"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
        <Tab key="signIn" tab="账户密码登录">
          {status === 'error' && entranceType === 'account' && !submitting && (
            <EntranceMessage content="账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="name"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="psw"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        {/* <Tab key="mobile" tab="手机号登录">
          {status === 'error' && entranceType === 'mobile' && !submitting && (
            <EntranceMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoSignIn} onChange={(e) => setAutoSignIn(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div> */}
        <Submit loading={submitting}>登录</Submit>
        {/* <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.signUp} to="/entrance/signUp">
            注册账户
          </Link>
        </div> */}
      </EntranceFrom>
    </div>
  );
};

export default connect(({ entrance, loading }) => ({
  entrance,
  submitting: loading.effects['entrance/signIn'],
}))(Entrance);
