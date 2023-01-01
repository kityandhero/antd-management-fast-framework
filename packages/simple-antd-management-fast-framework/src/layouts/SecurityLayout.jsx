import React from 'react';
import { connect, Redirect } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';

import {
  queryStringify,
  recordDebug,
} from 'antd-management-fast-common/es/utils/tools';

import { defaultSettings } from '@/defaultSettings';

const entrancePath = defaultSettings.getEntrancePath();

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      const getCurrentOperatorType = 'currentOperator/getCurrentOperator';

      recordDebug(`modal access: ${getCurrentOperatorType}`);

      dispatch({
        type: getCurrentOperatorType,
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentOperator } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const hasOperator = !!currentOperator;
    const queryString = queryStringify({
      redirect: window.location.href,
    });

    if ((!hasOperator && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!hasOperator && window.location.pathname !== entrancePath) {
      return <Redirect to={`${entrancePath}?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ currentOperator, loading }) => ({
  currentOperator: currentOperator.currentOperator,
  loading: loading.models.user,
}))(SecurityLayout);
