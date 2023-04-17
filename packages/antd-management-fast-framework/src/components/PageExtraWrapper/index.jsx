import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { PageExtra } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';

const { PageWrapper } = PageExtra;

@connect(({ switchControl, tabControl }) => ({
  switchControl,
  tabControl,
}))
class PageExtraWrapper extends PureComponent {
  render() {
    const { children, switchControl, tabControl, flag, tabFlag, ...rest } =
      this.props;

    const spinning = switchControlAssist.check(switchControl, flag);
    const activeKey = tabControl[tabFlag] || '';

    return (
      <PageWrapper
        {...rest}
        dataLoading={spinning}
        reloading={spinning}
        tabActiveKey={activeKey}
      >
        {children}
      </PageWrapper>
    );
  }
}

export { PageExtraWrapper };
