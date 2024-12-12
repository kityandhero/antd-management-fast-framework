import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

class SelectDrawerButton extends BaseElasticitySelectButton {
  openSelector = () => {
    PageListSelectDrawer.open();
  };

  afterSelectSuccessCore = (o) => {
    if ((o || null) == null) {
      return;
    }

    const { afterSelectSuccess } = this.props;

    this.setState({
      selectData: o,
    });

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(o);
    }
  };

  renderPresetSelector = () => {
    const { label } = {
      label: 'Label',
      ...this.props,
    };

    return (
      <PageListSelectDrawer
        title={label}
        width={800}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SelectDrawerButton };
